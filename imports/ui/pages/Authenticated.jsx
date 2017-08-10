import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const Authenticated = ({ component, appProps, ...rest }) => (
  <Route
    {...rest}
    render={(routerProps) => {
      if (appProps.loggingIn) { return <div /> }
      return appProps.authenticated ?
        React.createElement(component, { ...routerProps, ...appProps }) :
        <Redirect to='/' />
    }}
  />
)

Authenticated.propTypes = {
  component: PropTypes.func.isRequired,
  appProps: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Authenticated
