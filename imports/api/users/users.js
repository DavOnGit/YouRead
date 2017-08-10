import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

// Deny all client-side updates to user documents
Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
})

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

const Schema = {}

Schema.Password = new SimpleSchema({
  bcrypt: String
})

Schema.Resume = new SimpleSchema({
  loginTokens: {
    type: Array,
    optional: true
  },
  'loginTokens.$': {
    type: Object,
    optional: true
  },
  'loginTokens.$.when': String,
  'loginTokens.$.hashedToken': String
})

Schema.Services = new SimpleSchema({
  password: Schema.Password,
  resume: {
    type: Schema.Resume,
    optional: true
  }
})

Schema.Location = new SimpleSchema({
  city: {
    type: String,
    max: 30,
    optional: true
  },
  countryCode: {
    type: String,
    regEx: /^[A-Z]+$/,
    min: 2,
    max: 2,
    optional: true
  }
})

Schema.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-zA-Z0-9]+$/,
    max: 20
  },
  emails: {
    type: Array,
    max: 50
  },
  'emails.$': Object,
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  location: Schema.Location,
  services: Schema.Services,
  reqBookIn: Array,
  'reqBookIn.$': {
    type: Object,
    blackbox: true,
    optional: true
  },
  reqBookOut: Array,
  'reqBookOut.$': {
    type: Object,
    blackbox: true,
    optional: true
  },
  bookYouShared: Array,
  'bookYouShared.$': {
    type: Object,
    blackbox: true,
    optional: true
  },
  bookSharedWithYou: Array,
  'bookSharedWithYou.$': {
    type: Object,
    blackbox: true,
    optional: true
  },
  createdAt: Date,
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) { return new Date() }
      return undefined
    },
    denyInsert: true,
    optional: true
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
})

Meteor.users.attachSchema(Schema.User)
