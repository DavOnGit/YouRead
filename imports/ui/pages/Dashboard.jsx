import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import Row from 'react-bootstrap/lib/Row.js'
import Col from 'react-bootstrap/lib/Col.js'
import Jumbotron from 'react-bootstrap/lib/Jumbotron.js'
import Panel from 'react-bootstrap/lib/Panel.js'
import Button from 'react-bootstrap/lib/Button.js'
import ListGroup from 'react-bootstrap/lib/ListGroup.js'
import PageHeader from 'react-bootstrap/lib/PageHeader.js'

import BookItem from '../components/BookItemDashb.jsx'
import BookList from '../components/BookList.jsx'

const settingsHeader = (
  <div className='settings-header' title='Settings'>
    <span className='glyphicon glyphicon-cog' />
    <span className='glyphicon glyphicon-user' />
  </div>
)

const requestInHeader = (
  <div className='settings-header' title='Books you asked'>
    <span className='glyphicon glyphicon-import' />
    <span className='glyphicon glyphicon-book' />
  </div>
)

const requestOutHeader = (
  <div className='settings-header' title='Books requests from other members'>
    <span className='glyphicon glyphicon-export' />
    <span className='glyphicon glyphicon-book' />
  </div>
)

const booksInHeader = (
  <div className='settings-header' title='Books shared with you'>
    <span className='glyphicon glyphicon-save' />
    <span className='glyphicon glyphicon-book' />
  </div>
)

const booksOutHeader = (
  <div className='settings-header' title='Books you shared'>
    <span className='glyphicon glyphicon-open' />
    <span className='glyphicon glyphicon-book' />
  </div>
)

const openLocationDialog = (modal, name, props) => () => {
  modal.open(name, props)
}

const myBooks = (books) => {
  const userId = Meteor.userId()
  return books.filter(book => book.owner === userId)
}

const Dashboard = ({ modal, currentUser, books }) => (
  <div className='dashboard-page'>
    <Jumbotron>
      <h1>Dashboard</h1>
    </Jumbotron>
    <div className='container-fluid'>
      <Row>
        <Col md={10} lg={8} className='settings-section'>
          <PageHeader><small>Settings</small></PageHeader>
          <Panel
            header={settingsHeader}
            collapsible
          >
            <Button
              bsStyle='success'
              onClick={
                openLocationDialog(modal, 'setUserLocation',
                  {
                    title: 'Update Location',
                    userId: currentUser._id,
                    userLoc: currentUser.location,
                    size: 'sm'
                  }
                )
              }
            >
              Update your location
            </Button>
          </Panel>
          <PageHeader><small>Requests & Trades</small></PageHeader>
          <Panel header={requestInHeader} bsStyle='info'>
            <ListGroup>
              {
                currentUser.reqBookIn && currentUser.reqBookIn.length !== 0 ?
                  currentUser.reqBookIn.map(req => (
                    <BookItem
                      book={books.filter(book => book._id === req.bookId)[0]}
                      userId={currentUser._id}
                      canDelete
                      canConfirm={false}
                      key={req.createdAt}
                    />
                  )) :
                  <p>you have requested no books yet...</p>
              }
            </ListGroup>
          </Panel>

          <Panel header={requestOutHeader} bsStyle='info'>
            <ListGroup>
              {
                currentUser.reqBookOut && currentUser.reqBookOut.length !== 0 ?
                  currentUser.reqBookOut.map(req => (
                    <BookItem
                      book={books.filter(book => book._id === req.bookId)[0]}
                      userId={currentUser._id}
                      canDelete
                      canConfirm
                      key={req.createdAt}
                    />
                  )) :
                  <p>no requests from members yet...</p>
              }
            </ListGroup>
          </Panel>

          <Panel header={booksInHeader} bsStyle='info'>
            <ListGroup>
              {
                currentUser.bookSharedWithYou && currentUser.bookSharedWithYou.length !== 0 ?
                  currentUser.bookSharedWithYou.map(req => (
                    <BookItem
                      book={books.filter(book => book._id === req.bookId)[0]}
                      userId={currentUser._id}
                      key={req.createdAt}
                    />
                  )) :
                  <p>no shared books from community...</p>
              }
            </ListGroup>
          </Panel>

          <Panel header={booksOutHeader} bsStyle='info'>
            <ListGroup>
              {
                currentUser.bookYouShared && currentUser.bookYouShared.length !== 0 ?
                  currentUser.bookYouShared.map(req => (
                    <BookItem
                      book={books.filter(book => book._id === req.bookId)[0]}
                      userId={currentUser._id}
                      key={req.createdAt}
                    />
                  )) :
                  <p>you have shared no books yet...</p>
              }
            </ListGroup>
          </Panel>
        </Col>
      </Row>
      <PageHeader><small>Your library</small></PageHeader>
      <div className='books-section'>
        <BookList books={myBooks(books)} user={currentUser} modal={modal} />
      </div>
    </div>
  </div>
)

Dashboard.propTypes = {
  books: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  currentUser: PropTypes.shape({
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
  }).isRequired,
  modal: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func
  }).isRequired
}

export default Dashboard
