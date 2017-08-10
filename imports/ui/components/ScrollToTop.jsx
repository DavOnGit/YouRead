import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() { return null }
}

ScrollToTop.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired
}

export default withRouter(ScrollToTop)
