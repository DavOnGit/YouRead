import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import Row from 'react-bootstrap/lib/Row.js'
import Col from 'react-bootstrap/lib/Col.js'
import FormGroup from 'react-bootstrap/lib/FormGroup.js'
import ControlLabel from 'react-bootstrap/lib/ControlLabel.js'
import FormControl from 'react-bootstrap/lib/FormControl.js'
import Button from 'react-bootstrap/lib/Button.js'
import { NotificationManager } from 'react-notifications'

class Login extends React.Component {
  state = {
    nameOrEmail: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { nameOrEmail, password } = this.state
    
    Meteor.loginWithPassword(nameOrEmail, password, (err) => {
      if (err) {
        NotificationManager.warning(err.reason, null, 4000)
        return
      }
      
      const { location } = this.props
      
      if (location.state && location.state.nextPathname) {
        this.props.history.push(location.state.nextPathname);
      } else {
        this.props.history.push('/')
      }
      NotificationManager.info(`Welcome ${nameOrEmail}!`, 'Succesfully logged in')
    })
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.trim() })
  }

  render() {
    const { nameOrEmail, password } = this.state
    return (
      <div className='login-page'>
        <Row>
          <Col xs={12} sm={6} md={4} className='login-form'>
            <h4 className='page-header'>Login</h4>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel htmlFor='login-nameoremail'>Username or email</ControlLabel>
                <FormControl
                  name='nameOrEmail'
                  type='text'
                  value={nameOrEmail}
                  id='login-nameoremail'
                  placeholder='User Name or Email Address'
                  onChange={this.handleChange}
                  autoFocus
                  required
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel htmlFor='login-password'>
                  <span className='pull-left'>Password</span>
                  <Link className='pull-right' to='/recover-password'>Forgot Password?</Link>
                </ControlLabel>
                <FormControl
                  name='password'
                  type='password'
                  value={password}
                  id='login-password'
                  placeholder='Password'
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <Button type='submit' bsStyle='success'>Login</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string
  }).isRequired
}

export default Login
