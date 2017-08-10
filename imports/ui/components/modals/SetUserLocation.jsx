import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button.js'
import FormGroup from 'react-bootstrap/lib/FormGroup.js'
import ControlLabel from 'react-bootstrap/lib/ControlLabel.js'
import Modal from 'react-bootstrap/lib/Modal.js'
import { Meteor } from 'meteor/meteor'
import { NotificationManager } from 'react-notifications'

export default class SetUserLocation extends React.PureComponent {
  state = {
    city: '',
    countryCode: ''
  }
  
  componentWillMount() {
    const { city, countryCode } = this.props.userLoc
    if (!city || !countryCode) { return }
    this.setState({ city, countryCode })
  }

  handleChange = (e) => {
    const upperMaybe = e.target.name === 'countryCode' ? e.target.value.toUpperCase() : e.target.value
    this.setState({ [e.target.name]: upperMaybe.trim() })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const location = { ...this.state }
    
    Meteor.call('user.update.location', this.props.userId, location, (err) => {
      if (err) {
        NotificationManager.warning(err.reason, 'warning', 4000)
        return
      }
      this.props.modal.close()
      NotificationManager.info('User location updated!')
    })
  }

  render () {
    const { city, countryCode } = this.state
    const { modal } = this.props;

    return (
      <form onSubmit={this.handleSubmit} >
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Country Code</ControlLabel>
            <input
              name='countryCode'
              value={countryCode}
              type='text'
              className='form-control'
              onChange={this.handleChange}
              placeholder='example: UK'
              required
            />
          </FormGroup>
          <ControlLabel>City</ControlLabel>
          <input
            name='city'
            value={city}
            type='text'
            className='form-control'
            onChange={this.handleChange}
            placeholder='example: London'
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='success'>Update</Button>
          <Button onClick={modal.close} bsStyle='default'>Cancel</Button>
        </Modal.Footer>
      </form>
    )
  }
}

SetUserLocation.propTypes = {
  userId: PropTypes.string.isRequired,
  userLoc: PropTypes.shape({
    city: PropTypes.string,
    countryCode: PropTypes.string
  }).isRequired,
  modal: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func
  }).isRequired
}
