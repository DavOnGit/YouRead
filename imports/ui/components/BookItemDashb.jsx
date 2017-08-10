import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'

const handleCancelReq = (bookId, userId, canConfirm) => () => {
  Meteor.call('users.book.cancelRequest', bookId, userId, canConfirm)
}

const handleConfirmReq = (bookId, userId) => () => {
  Meteor.call('users.book.confirmRequest', bookId, userId)
}

const BookItem = ({ book, canConfirm, canDelete, userId }) => (
  <ListGroupItem>
    <span>{book.volumeInfo.title.substring(0, 40)}</span>
    {canDelete ? (
      <button className='close' onClick={handleCancelReq(book._id, userId, canConfirm)}>
        <span className='glyphicon glyphicon-remove' />
      </button>) : null
    }
    {canConfirm ? (
      <button className='close' onClick={handleConfirmReq(book._id, userId)}>
        <span className='glyphicon glyphicon-ok' />
      </button>) : null
    }
  </ListGroupItem>
)

BookItem.defaultProps = {
  canConfirm: false,
  canDelete: false
}

BookItem.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  canConfirm: PropTypes.bool,
  canDelete: PropTypes.bool,
  userId: PropTypes.string.isRequired
}

export default BookItem
