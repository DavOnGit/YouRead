import { Meteor } from 'meteor/meteor'

Meteor.publish('userData', function() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: {
          location: 1,
          reqBookOut: 1,
          reqBookIn: 1,
          bookYouShared: 1,
          bookSharedWithYou: 1
        }
      }
    )
  }
  return this.ready()
})
