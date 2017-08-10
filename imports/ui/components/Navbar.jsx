import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/lib/Navbar.js'
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import debounceScroll from '../../lib/debounce.js'
import PublicNavbar from './PublicNavbar.jsx'
import AuthenticatedNavbar from './AuthenticatedNavbar.jsx'

class NavigationBar extends React.PureComponent {
  state = { navShow: true }
  
  componentWillMount() {
    this.handleScroll = debounceScroll(this.handleScroll, 300)
    this.lastScrollPos = 0
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  handleScroll = () => {
    const scrollingElement = document.scrollingElement || document.documentElement
    const scrollPos = scrollingElement.scrollTop
    
    if (scrollPos < this.lastScrollPos && this.state.navShow === false) {
      this.setState({ navShow: true })
    }
    if (scrollPos > this.lastScrollPos && this.state.navShow === true) {
      this.setState({ navShow: false })
    }
    this.lastScrollPos = scrollPos
  }
  
  render() {
    const { authenticated, userName, email, userSubReady } = this.props
    return (
      <div className='nav-container'>
        <Navbar className={!this.state.navShow ? 'no-show' : ''} inverse collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>
                <span>
                  <Glyphicon glyph='book' />&nbsp;YouRead
                </span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            { authenticated ?
              <AuthenticatedNavbar userName={userName} email={email} /> :
              <PublicNavbar userSubReady={userSubReady} />
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

NavigationBar.defaultProps = {
  userName: null,
  email: null
}

NavigationBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  email: PropTypes.string,
  userSubReady: PropTypes.bool.isRequired
}

export default NavigationBar
