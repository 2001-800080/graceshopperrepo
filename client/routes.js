import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Cart, AllBouquets, SingleBouquet, NotFoundPage} from './components'
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
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route
            path="/confirmation"
            exact={true}
            render={() => <ConfirmationPage />}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={AllBouquets} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/bouquets/:bouquetId" component={SingleBouquet} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/home" component={UserHome} />
              <Route component={NotFoundPage} />
            </Switch>
          )}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
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

export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
