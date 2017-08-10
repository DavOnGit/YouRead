import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button.js'
import { Meteor } from 'meteor/meteor'
import { NotificationManager } from 'react-notifications'

const deleteThisBook = (modal, id) => () => {
  Meteor.call('books.remove', id, (err) => {
    if (err) {
      NotificationManager.error('Internal error!', 'Oops...!')
    }
    NotificationManager.success('Book removed')
  })
  modal.close()
}

export const ConfirmRemoveBookModalBody = () => (
  <div>
    <p>This is permanent, are you sure?</p>
  </div>
)

export const ConfirmRemoveBookModalFooter = ({ modal, bookId }) => (
  <div>
    <Button onClick={deleteThisBook(modal, bookId)} bsStyle='default'>Totally</Button>
    <Button onClick={modal.close} bsStyle='default'>No</Button>
  </div>
)

ConfirmRemoveBookModalFooter.propTypes = {
  bookId: PropTypes.string.isRequired,
  modal: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func
  }).isRequired
}
