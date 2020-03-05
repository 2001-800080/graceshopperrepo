#!/usr/bin/env node

const {spawn} = require('child_process')
const fs = require('fs')

const axios = require('axios')
const GitUrlParse = require('git-url-parse')
const simpleGit = require('simple-git')()
const YAML = require('yaml')

/* Specific message contents stored as constants */

const keyComments = require('./keyComments.json')

const idempotenceMessage = `It appears that your token has been encrypted.
To run this script again, delete the \`before_deploy\` and \`deploy\` keys
from the .travis.yml file.`

const successMessage = `Complete! Run \`git diff .travis.yml\` to check.`

/* Clean up system state changes. */
const clean = () => {
  const externalFiles = ['.tmp.key.pem', '.tmp.token.txt', '.tmp.token.enc']
  externalFiles.forEach(file => {
    if (fs.existsSync(file)) fs.unlinkSync(file)
  })
}

/* Get a specific git remote URL. */
const getRemoteURL = (name, remotes) => {
  try {
    return remotes.filter(remote => remote.name === name)[0].refs.fetch
  } catch (err) {
    console.log(
      `It appears that the remote ${name} does not exist.`,
      `Here is the full error:`,
      err
    )
  }
}

/* Run a command and return its stdout. */
const getOutputFromCommand = async (command, args) => {
  const response = await new Promise((resolve, reject) => {
    const process = spawn(command, args)

    const stdout = []
    const stderr = []

    process.stdout.on('data', data => {
      stdout.push(data)
    })

    process.stderr.on('data', data => {
      stderr.push(data)
    })

    process.on('close', code => {
      if (code) throw new Error(reject(stderr))
      resolve(stdout)
    })
  })
  return response
}

/* Use git remote URLs to get app identifiers. */
const getNamesFromGit = () =>
  new Promise((resolve, reject) =>
    simpleGit.getRemotes(true, (err, res) => {
      if (err) throw new Error(reject(err))
      resolve({
        fullName: GitUrlParse(getRemoteURL('origin', res)).full_name,
        appName: GitUrlParse(getRemoteURL('heroku', res)).name
      })
    })
  )

/* Use the openssl command to encrypt an authentication token. */
const encryptHerokuToken = async () => {
  await getOutputFromCommand('openssl', [
    'rsautl',
    '-encrypt',
    '-pubin',
    '-inkey',
    '.tmp.key.pem',
    '-in',
    '.tmp.token.txt',
    '-out',
    '.tmp.token.enc'
  ])
}

/* Write the encrypted key, and other values, to the .travis.yml file. */
const updateTravisYAML = (app, key) => {
  const travis = fs.readFileSync('.travis.yml', 'utf8')
  const doc = YAML.parseDocument(travis)
  if (doc.has('before_deploy')) {
    return console.log(idempotenceMessage)
  }
  doc.set('before_deploy', ['rm -rf node_modules'])
  doc.set(
    'deploy',
    YAML.createNode({
      skip_cleanup: true, //eslint-disable-line
      provider: 'heroku',
      app: app,
      api_key: {secure: key} //eslint-disable-line
    })
  )
  doc.contents.items
    .filter(item => item.key in keyComments)
    .forEach(item => {
      item.comment = keyComments[item.key]
      if (item.key === 'deploy') {
        item.value.items.forEach(item_ => {
          item_.commentBefore = keyComments[item_.key]
        })
      }
    })
  doc.comment = ''
  fs.writeFileSync('.travis.yml', doc.toString())
  return true
}

const main = async () => {
  const verbose = process.argv.hasOwnProperty(2)
  const {fullName, appName} = await getNamesFromGit()

  /* Get Heroku authentication token from the Heroku CLI. */
  const herokuTokenOut = await getOutputFromCommand('heroku', ['auth:token'])
  const herokuTokenStr = herokuTokenOut.toString('utf-8')
  const herokuToken = herokuTokenStr.slice(0, herokuTokenStr.length - 1)
  if (verbose) console.log('Received Heroku token', herokuToken.toString())

  /* Download the repo's public key supplied by Travis. */
  // const travisURL = `https://api.travis-ci.org/repos/${fullName}/key`
  // const travisResponse = await axios.get(travisURL)
  // const key = travisResponse.data.key
  const key =
    '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvoEjC781H/B8t1k61XQq\nsNA4/r+aKPQgWGunN9MV40TIdRdGr0i3ue9fjqHdbjFrAiR0baKNt22wbVsBZf4S\nREgKJCMR23iNcj3vABynpVivRDs2fCsOB9FrxtFfFAtsVUcLwSzot5v3al8xTVBk\nK3lrA+KWEW3sknu3Vud5BzKs/uJhY2Y2QcThRMhqq8iOHWiooOaAKedJiZA+yS8h\niCt+bZtq9sZ7X9VfbaebRHqu3drl4oqpqSkHbGcHIOz9SDgq9wMm+wU4Wpo6tZTs\nHGaDaR9O/7EnVbBq7CBwbotlng9VdarNoHGrEwb9ONBZQdiOcH62e4wwajnXJQLW\nhxSUd3+3GcSZUCqtt5HjLbYW/7nq7gQqUWvC58O80wx8i5AswlE0X/pXdsgY3fSf\nh/imHZr07JqAxxENmtYIb2Z5zcjJk3uJRQsqSHstwHVttu/MnEU6m4Jd/MLYtMq5\nT9/Jd4od8cpt1ByBpbJnf4EJHUN5XqF3YXZOaeTz7eueV/a7qq5uf+ZWGNfYvOw0\nCTjRVdnK1u5dC3U1OBb1NLhfBSM8xsUwZlGWKocTOHxbGSPPwsZBdEfbVMboWDcZ\nTAuzWhzXdzT6LZJoKdhDOH/H584IKN4z079JAtIk6bmaHjKJ/+5YPuBKb0A3w+O0\n/MXwyZJwPdsPVc0SrOgbWssCAwEAAQ==\n-----END PUBLIC KEY-----\n'
  const keyBuffer = Buffer.from(key, 'utf-8')
  if (verbose) console.log('Received Travis pubkey:\n', keyBuffer.toString())

  /* Write files for use with openssl */
  fs.writeFileSync('.tmp.key.pem', key)
  fs.writeFileSync('.tmp.token.txt', herokuToken)

  /* Encrypt the Heroku token and save it in the .tmp.token.enc file. */
  await encryptHerokuToken()

  /* Encode the encrypted data in base64. */
  const keyBase64 = fs.readFileSync('.tmp.token.enc').toString('base64')
  if (verbose) console.log('Encrypted key base 64 encoded:', keyBase64)

  /* Delete temporary files. */
  clean()

  /* Add the encrypted key to the .travis.yml file. */
  const update = updateTravisYAML(appName, keyBase64)
  if (update) console.log(successMessage)

  /* Clean up in the case of unspecified errors. */
  process.on('uncaughtException', () => {
    clean()
    if (verbose) console.log('Cleaned up on error!')
    process.exit(1)
  })

  process.on('unhandledRejection', () => {
    clean()
    if (verbose) console.log('Cleaned up on error!')
    process.exit(1)
  })
}

if (require.main === module) {
  main()
    .then(e => console.log('i am done'))
    .catch(e => console.log('please', e))
}
