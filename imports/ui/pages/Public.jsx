import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const Public = ({ component, ...rest }, { loggingIn, authenticated, ...ctxtRest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (loggingIn) { return <div /> }
      return !authenticated ?
        React.createElement(component, { ...props, loggingIn, authenticated, ...ctxtRest }) :
        <Redirect to='/dashboard' />
    }}
  />
)

Public.defaultProps = {
  loggingIn: undefined,
  authenticated: undefined,
  component: undefined
}

Public.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func
}

Public.contextTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  currentUser: PropTypes.object,
  modal: PropTypes.object
}

export default Public
