import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import Books from './books.js'

Meteor.methods({
  'books.insert'(book) {
    check(book, Object)

    if (!this.userId) {
      throw new Error('not-authorized')
    }
    
    const data = {
      ...book,
      owner: Meteor.userId()
    }

    Books.insert(data, (err) => {
      if (err) {
        throw new Meteor.Error('mismatch error', err.sanitizedError.reason, err.sanitizedError.details)
      }
    })
  },
  'books.remove'(bookId) {
    check(bookId, String)
    
    if (!this.userId) {
      throw new Error('not-authorized')
    }
    
    const book = Books.findOne(bookId)
    if (book.owner !== this.userId) {
      throw new Error('not-authorized')
    }
    Books.remove(bookId, (err) => {
      if (err) {
        throw new Error()
      }
    })
  },
  'books.update'(bookId, data, userId) {
    check(bookId, String)
    check(data, Object)
    check(userId, String)
    
    if (!this.userId || this.userId !== userId) {
      throw new Error('not-authorized')
    }
    
    Books.update(
      { _id: bookId },
      { $set: { ...data } },
      (err) => {
        if (err) {
          throw new Error()
        }
      }
    )
  }
})
