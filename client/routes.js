import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Cart,
  // Login,
  // Signup,
  // UserHome,
  AllBouquets,
  SingleBouquet,
  NotFoundPage
  // ConfirmationPage
} from './components'
import {me} from './store'
import ConfirmationPage from './components/confirmation_page'
import {Login, Signup} from './components/auth-form'
import {UserHome} from './components/user-home'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/confirmation" component={ConfirmationPage} />
        <Route path="/login" exact={true} render={() => <Login />} />
        <Route path="/signup" exact={true} render={() => <Signup />} />
        {/* ORDER MATTERS OMG */}
        <Route exact path="/" component={AllBouquets} />
        {/* <Route exact path="/:bouquetId" component={SingleBouquet} />{' '} */}
        {/* <Route exact path="*" component={NotFoundPage} /> */}
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/:bouquetId" component={SingleBouquet} />
        <Route path="*" exact={true} render={() => <NotFoundPage />} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

// PropTypes.func.isRequired means loadInitialData must be of type function
// PropTypes.bool.isRequired means isLoggedIn must be of type boolean
