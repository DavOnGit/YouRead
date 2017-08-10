import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'

Accounts.onCreateUser((options, user) => {
  const customUser = Object.assign({
    location: {
      city: null,
      countryCode: null
    },
    reqBookOut: [],
    reqBookIn: [],
    bookYouShared: [],
    bookSharedWithYou: []
  }, user)
  return customUser
})

Meteor.methods({
  'user.update.location'(userId, location) {
    check(userId, String)
    check(location, {
      city: String,
      countryCode: String
    })
  
    if (!this.userId || this.userId !== userId) {
      throw new Error('not-authorized')
    }
    
    Meteor.users.update(
      { _id: this.userId },
      {
        $set: {
          'location.countryCode': location.countryCode,
          'location.city': location.city
        }
      },
      (err) => {
        if (err) {
          throw new Meteor.Error('mismatch error', err.sanitizedError.reason, err.sanitizedError.details)
        }
      }
    )
  },
  'user.book.makeRequest'(bookId, owner, userId, email) {
    check(bookId, String)
    check(owner, String)
    check(userId, String)
    check(email, String)
    
    if (!this.userId || this.userId !== userId) {
      throw new Error('not-authorized')
    }
    
    const reqBookOut = {
      bookId,
      userId,
      email,
      createdAt: new Date()
    }
    
    const reqBookIn = {
      bookId,
      userId: owner,
      createdAt: new Date()
    }
    
    Meteor.users.update({ _id: this.userId }, { $push: { reqBookIn } },
      (err) => {
        if (err) { throw new Error() }
      }
    )
    
    Meteor.users.update({ _id: owner }, { $push: { reqBookOut } },
      (err) => {
        if (err) { throw new Error() }
      }
    )
    
    Meteor.call('books.update', bookId, { requested: true }, userId)
  },
  'users.book.confirmRequest'(bookId, userId) {
    check(bookId, String)
    check(userId, String)
    
    if (!this.userId || this.userId !== userId) {
      throw new Error('not-authorized')
    }
    
    const requestData = Meteor.user().reqBookOut.filter(req => req.bookId === bookId)[0]
    
    Meteor.call('users.book.cancelRequest', bookId, userId, true)
    
    Meteor.users.update(
      { _id: this.userId },
      { $push: { bookYouShared: { ...requestData, createdAt: new Date() } } },
      (err) => {
        if (err) { throw new Error() }
      }
    )
    
    const receiverData = { userId: this.userId, bookId }
    
    Meteor.users.update(
      { _id: requestData.userId },
      { $push: { bookSharedWithYou: { ...receiverData, createdAt: new Date() } } },
      (err) => {
        if (err) { throw new Error() }
      }
    )
    
    Meteor.call('books.update', bookId, { sharedTo: requestData.userId }, userId)
  },
  'users.book.cancelRequest'(bookId, userId, canConfirm) {
    check(bookId, String)
    check(userId, String)
    check(canConfirm, Boolean)
    
    if (!this.userId || this.userId !== userId) {
      throw new Error('not-authorized')
    }
    
    const reqType = canConfirm ? 'reqBookOut' : 'reqBookIn'
    const otherUserReqType = !canConfirm ? 'reqBookOut' : 'reqBookIn'
    const otherUserId = Meteor.user()[reqType].filter(req => req.bookId === bookId)[0].userId

    Meteor.users.update(
      { _id: this.userId },
      { $pull: { [reqType]: { bookId, userId: otherUserId } } },
      (err) => {
        if (err) { throw new Error() }
      }
    )
    
    Meteor.users.update(
      { _id: otherUserId },
      { $pull: { [otherUserReqType]: { bookId, userId } } },
      (err) => {
        if (err) { throw new Error() }
      }
    )
    
    Meteor.call('books.update', bookId, { requested: false }, userId)
  }
})
