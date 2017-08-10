import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const Books = new Mongo.Collection('books')

Books.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
})

Books.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

const thumbnailSchema = new SimpleSchema({
  smallThumbnail: {
    type: String,
    optional: true
  },
  thumbnail: {
    type: String,
    optional: true
  }
})

const volumeInfoSchema = new SimpleSchema({
  title: {
    type: String,
    max: 200
  },
  authors: {
    type: Array,
    optional: true
  },
  'authors.$': {
    type: String,
    label: 'Author',
    optional: true
  },
  publisher: {
    type: String,
    optional: true
  },
  imageLinks: {
    type: thumbnailSchema,
    optional: true
  }
})

export const bookSchema = new SimpleSchema({
  volumeInfo: {
    type: volumeInfoSchema
  },
  owner: String,
  etag: {
    type: String,
    optional: true
  },
  sharedTo: {
    type: String,
    optional: true
  },
  requested: {
    type: Boolean,
    defaultValue: false
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) { return new Date() }
      if (this.isUpsert) { return { $setOnInsert: new Date() } }
      return this.unset()
    }
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) { return new Date() }
      return undefined
    },
    denyInsert: true,
    optional: true
  }
})

Books.attachSchema(bookSchema)

export default Books
