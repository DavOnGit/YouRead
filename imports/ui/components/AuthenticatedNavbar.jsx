import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/lib/Nav.js'
import NavItem from 'react-bootstrap/lib/NavItem.js'
import NavDropdown from 'react-bootstrap/lib/NavDropdown.js'
import MenuItem from 'react-bootstrap/lib/MenuItem.js'
import { LinkContainer } from 'react-router-bootstrap'
import { Meteor } from 'meteor/meteor'
import md5 from 'md5'

const handleLogout = () => { Meteor.logout() }

const avatarUrl = (email) => {
  const hash = md5(email.trim().toLowerCase())
  
  return `https://www.gravatar.com/avatar/${hash}?s=30&d=retro`
}

const AuthenticatedNavbar = ({ userName, email }) => (
  <div>
    <Nav pullRight>
      <NavDropdown
        className='user-dropdown'
        title={
          <span>
            <img className='avatar' src={avatarUrl(email)} alt='' />
            <span className='username'>{userName}</span>
          </span>
        }
        id='basic-nav-dropdown'
        eventKey={5}
      >
        <MenuItem className='center-block' onClick={handleLogout} eventKey={5.1}>
          <span>
            Logout&nbsp;
            <span className='glyphicon glyphicon-log-out' />
          </span>
        </MenuItem>
      </NavDropdown>

      <LinkContainer to='/dashboard'>
        <NavItem>
          <span>
            Dashboard&nbsp;
            <span className='glyphicon glyphicon-cog' />
          </span>
        </NavItem>
      </LinkContainer>
    </Nav>
  </div>
)

AuthenticatedNavbar.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default AuthenticatedNavbar
