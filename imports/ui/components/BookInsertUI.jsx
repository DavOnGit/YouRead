import React from 'react'
import Autocomplete from 'react-autocomplete'
import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import FormGroup from 'react-bootstrap/lib/FormGroup.js'
import ControlLabel from 'react-bootstrap/lib/ControlLabel.js'
import ListGroup from 'react-bootstrap/lib/ListGroup.js'
import Media from 'react-bootstrap/lib/Media.js'
import { NotificationManager } from 'react-notifications'

const styles = {
  wrapper: {
    position: 'relative',
    display: 'block',
    minWidth: 'unset'
  },
  ddmenu: {
    position: 'absolute',
    backgroundColor: '#ddd',
    padding: '10px 0',
    maxHeight: '400px',
    overflow: 'auto',
    zIndex: 2
  },
  item: {
    padding: '5px'
  },
  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '5px'
  }
}

class BookInsert extends React.PureComponent {
  state = {
    inputValue: '',
    booksFound: [],
    xhr: null
  }
  
  handleFocus = (e) => {
    e.target.select();
  }
  
  render () {
    return (
      <FormGroup className='book-insert-component'>
        <ControlLabel htmlFor='books-autocomplete'>Add new book</ControlLabel>
        <Autocomplete
          inputProps={{ onFocus: this.handleFocus, id: 'books-autocomplete', className: 'form-control', type: 'text', placeholder: 'by title' }}
          wrapperProps={{ className: 'autocomplete-wrapper', style: styles.wrapper }}
          value={this.state.inputValue}
          items={this.state.booksFound}
          getItemValue={item => item.volumeInfo.title}
          onChange={
            (event, value) => {
              const url = 'https://www.googleapis.com/books/v1/volumes'
              const options = {
                params: {
                  printType: 'books',
                  q: window.encodeURIComponent(value),
                  projection: 'lite',
                  maxResults: 10
                },
                beforeSend: (xhr) => {
                  if (this.state.xhr) {
                    this.state.xhr.abort()
                  }
                  this.setState({ xhr })
                }
              }

              this.setState({ inputValue: value })

              if (value === '') {
                this.state.xhr.abort()
                this.setState({ booksFound: [] })
                return
              }

              HTTP.get(url, options, (err, result) => {
                if (err) {
                  if (err.message === 'network') { return }
                  NotificationManager.error(err.message, 'Error:', 4000)
                  return
                }
                this.setState({ xhr: null })
                this.setState({ booksFound: result.data.items || [] })
              })
            }
          }
          onSelect={
            (title, book) => {
              Meteor.call('books.insert', book, (err) => {
                if (err) {
                  NotificationManager.error(err.reason, 'Error', 4000)
                  return
                }
                NotificationManager.success('New book inserted', 'success')
              })
            }
          }
          renderMenu={
            items => (
              <ListGroup style={{ ...styles.ddmenu }}>
                {items.map(item => item)}
              </ListGroup>
            )
          }
          renderItem={
            (item, isHighlighted) => (
              <Media
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={item.id}
              >
                <Media.Left>
                  {
                    item.volumeInfo.imageLinks ?
                      <img
                        src={item.volumeInfo.imageLinks.smallThumbnail}
                        alt='cover'
                        width='40px'
                      /> : null
                  }
                </Media.Left>
                <Media.Body>
                  <Media.Heading>
                    {item.volumeInfo.title}
                  </Media.Heading>
                  <p>Autors: {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'unknown'}</p>
                </Media.Body>
              </Media>
            )
          }
        />
      </FormGroup>
    )
  }
}

export default BookInsert
