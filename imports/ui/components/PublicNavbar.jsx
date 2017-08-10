import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/lib/Nav.js'
import NavItem from 'react-bootstrap/lib/NavItem.js'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from './Loader.jsx'

const PublicNavbar = ({ userSubReady }) => (
  !userSubReady ? (
    <div className='pull-right'>
      <p className='navbar-text'>Fetching...</p>
      <Loader svgClass='nav-spinner' />
    </div>
  ) : (
    <Nav pullRight>
      {/* <Loader svgClass='nav-loader' /> */}
      <LinkContainer to='/login'>
        <NavItem>
          <span>
            Login&nbsp;
            <span className='glyphicon glyphicon-log-in' />
          </span>
        </NavItem>
      </LinkContainer>
      <LinkContainer to='/signup'>
        <NavItem>
          <span>
            Signup&nbsp;
            <span className='glyphicon glyphicon-edit' />
          </span>
        </NavItem>
      </LinkContainer>
    </Nav>
  )
)


PublicNavbar.propTypes = { userSubReady: PropTypes.bool.isRequired }

export default PublicNavbar
