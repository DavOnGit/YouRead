import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button.js'
import { Meteor } from 'meteor/meteor'
import { NotificationManager } from 'react-notifications'

const bookRequest = (modal, bookId, owner, userId, email) => () => {
  Meteor.call('user.book.makeRequest', bookId, owner, userId, email, (err) => {
    if (err) {
      NotificationManager.error('Internal error!', 'Oops...!')
    }
    NotificationManager.success('Book requested succesfully!')
  })
  modal.close()
}

export const BookRequestModalBody = () => (
  <div>
    <p>This will send a request to the book owner</p>
  </div>
)

export const BookRequestModalFooter = ({ modal, bookId, owner, userId, email }) => (
  <div>
    <Button onClick={bookRequest(modal, bookId, owner, userId, email)} bsStyle='primary'>Totally</Button>
    <Button onClick={modal.close} bsStyle='default'>No</Button>
  </div>
)

BookRequestModalFooter.propTypes = {
  bookId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  modal: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func
  }).isRequired
}
