import { Meteor } from 'meteor/meteor'

import Books from '../books.js'

Meteor.publish('books:all', () => Books.find())
// { $or: [{ requested: false }, { sharedTo: undefined }] }
