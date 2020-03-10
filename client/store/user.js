import axios from 'axios'
import history from '../history'
import {setCartThunk} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  try {
    let {data} = await axios.post(`/auth/${method}`, {email, password})
    dispatch(getUser(data))
    if (method === 'login') {
      dispatch(setCartThunk(email))
    }
    history.push('/home')
  } catch (authError) {
    if (method === 'login') {
      return dispatch(getUser({loginError: authError}))
    } else {
      // this is if (method === 'signup') {
      return dispatch(getUser({signupError: authError}))
    }
    //if method is login, return disp getuser loginerror: authError
    //if method is signup, resturn disp getuser signuperror: authError
    //return dispatch(getUser({error: authError}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
