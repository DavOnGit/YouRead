import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/lib/Row.js'
import Col from 'react-bootstrap/lib/Col.js'
import Panel from 'react-bootstrap/lib/Panel.js'
import Image from 'react-bootstrap/lib/Image.js'
import Button from 'react-bootstrap/lib/Button.js'

const openDialog = (modal, name, props) => () => {
  modal.open(name, props)
}

const BookList = ({ books, user, modal }) => (
  <Row className='book-list'>
    {
      books.filter(book => (!book.requested && !book.sharedTo))
      .map(book => (
        <Col xs={6} md={4} key={book._id} className='booklistcolumn'>
          <Panel className={'center-block'}>
            <Image
              className={'book-cover'}
              src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}
              alt='cover'
              responsive
            />
            <h4>{book.volumeInfo.title.substring(0, 40)}</h4>
            <p>
              {
                user && book.owner !== user._id ? (
                  <Button
                    bsStyle='primary'
                    onClick={
                      openDialog(
                        modal,
                        'bookRequest',
                        {
                          title: 'Book Request',
                          bookId: book._id,
                          owner: book.owner,
                          userId: user._id,
                          email: user.emails[0].address,
                          size: 'sm'
                        }
                      )
                    }
                  >
                    Ask this book
                  </Button>
                ) : null
              }
              {
                user && book.owner === user._id ? (
                  <Button
                    bsStyle='default'
                    onClick={
                      openDialog(
                        modal,
                        'confirmRemoveBook',
                        { title: 'Delete Book', bookId: book._id, size: 'sm' }
                      )
                    }
                  >
                    Delete
                  </Button>
                ) : null
              }
            </p>
          </Panel>
        </Col>
      ))
    }
  </Row>
)

BookList.defaultProps = { user: null }

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string,
        verified: PropTypes.bool
      })
    ),
    location: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string
    })
  }),
  modal: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func
  }).isRequired
}

export default BookList
