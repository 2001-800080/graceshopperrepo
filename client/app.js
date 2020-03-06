import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <div className="parent">
        <Navbar />
      </div>
      <Routes />
    </div>
  )
}

export default App
