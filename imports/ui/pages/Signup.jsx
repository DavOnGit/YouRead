import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import Row from 'react-bootstrap/lib/Row.js'
import Col from 'react-bootstrap/lib/Col.js'
import FormGroup from 'react-bootstrap/lib/FormGroup.js'
import ControlLabel from 'react-bootstrap/lib/ControlLabel.js'
import FormControl from 'react-bootstrap/lib/FormControl.js'
import Button from 'react-bootstrap/lib/Button.js'
import { NotificationManager } from 'react-notifications'

class Signup extends React.Component {

  state = {
    userName: '',
    emailAddress: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { userName, emailAddress, password } = this.state
    
    const user = {
      username: userName,
      email: emailAddress,
      password
    }
    
    Accounts.createUser(user, (err) => {
      if (err) {
        NotificationManager.warning(err.reason, null, 4000)
        return
      }
      
      this.props.history.push('/')
      NotificationManager.info(`Welcome ${user.username}!`, 'Succesfully signed up')
    })
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.trim() })
  }

  render() {
    const { userName, emailAddress, password } = this.state
    return (
      <div className='signup-page'>
        <Row>
          <Col xs={12} sm={6} md={4} className='signup-form'>
            <h4 className='page-header'>Sign Up</h4>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel htmlFor='signup-user-name'>User Name</ControlLabel>
                <FormControl
                  name='userName'
                  type='text'
                  value={userName}
                  id='signup-user-name'
                  placeholder='Last Name'
                  onChange={this.handleChange}
                  minLength='3'
                  autoFocus
                  required
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel htmlFor='signup-email-address'>Email Address</ControlLabel>
                <FormControl
                  name='emailAddress'
                  type='email'
                  value={emailAddress}
                  id='signup-email-address'
                  placeholder='Email Address'
                  onChange={this.handleChange}
                  pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                  required
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel htmlFor='signup-password'>Password</ControlLabel>
                <FormControl
                  name='password'
                  type='password'
                  value={password}
                  id='signup-password'
                  placeholder='Password'
                  onChange={this.handleChange}
                  minLength='3'
                  required
                />
              </FormGroup>
              <Button type='submit' bsStyle='success'>Sign Up</Button>
            </form>
            <p>Already have an account? <Link to='/login'>Log In</Link>.</p>
          </Col>
        </Row>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Signup
