import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const PropsRoute = ({ component, appProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => (
        React.createElement(component, { ...routeProps, ...appProps })
      )}
    />
  )
}

PropsRoute.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
}

export default PropsRoute
