import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loadable'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/lib/Row.js'
import Col from 'react-bootstrap/lib/Col.js'
import Panel from 'react-bootstrap/lib/Panel.js'
import ControlLabel from 'react-bootstrap/lib/ControlLabel.js'
import FormControl from 'react-bootstrap/lib/FormControl.js'

// import BookInsert from '../components/BookInsertUI.jsx'
import BookList from '../components/BookList.jsx'

const BookInsert = Loader({
  loader: () => import('../components/BookInsertUI.jsx'),
  loading: () => null
})

class Home extends React.PureComponent {
  state = {
    titleFilter: ''
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  render () {
    const { titleFilter } = this.state
    const query = titleFilter.trim().split(' ')

    const filtered = this.props.books.filter((book) => {
      let flag = true

      for (let i = 0; i < query.length; i += 1) {
        const rex = new RegExp(query[i], 'i')
        const test = rex.test(book.volumeInfo.title)
        
        if (!test) {
          flag = false
          break
        }
      }
      return flag
    })

    return (
      <div className='home-page'>
        <section className='header-wrapper'>
          <div>
            <h1>YouRead</h1>
            <p>Join the leading community of book sharing</p>
          </div>
        </section>
        <section className='info-section'>
          <div>
            <h3>What Is YouRead ?</h3>
            <p className='lead'>
              We are a comunity where you can browse books shared by members and offer a
              trade with your own books.
            </p>
            <p className='lead'>All free of course, so scroll down and start trading!</p>
          </div>
        </section>
        <section className='library-header-section'>
          <div>
            <h1>Library</h1>
          </div>
        </section>
        <section className='library-section'>
          <Row>
            <Col xs={12} sm={6}>
              <Panel
                header={
                  <div title='Add new book'>
                    <div className='tools'>
                      <span className='glyphicon glyphicon-plus' />
                      <span className='glyphicon glyphicon-book' />
                    </div>
                  </div>
                }
                collapsible
              >
                { this.props.currentUser ? <BookInsert /> :
                <div className='no-login-add'>
                  <span>
                    Please&nbsp;
                    <Link to='/login'>Login</Link>
                    &nbsp;or&nbsp;
                    <Link to='/signup'>Signup</Link>
                    &nbsp;before sharing!
                  </span>
                </div>
                }
              </Panel>
            </Col>
            <Col xs={12} sm={6}>
              <Panel
                header={
                  <div title='Search'>
                    <div className='tools'>
                      <span className='glyphicon glyphicon-search' />
                      <span className='glyphicon glyphicon-book' />
                    </div>
                  </div>
                }
                collapsible
              >
                <ControlLabel htmlFor='book-title-filter'>Filter by Title</ControlLabel>
                <FormControl
                  type='text'
                  name='titleFilter'
                  id='book-title-filter'
                  placeholder='title'
                  onChange={this.handleChange}
                />
              </Panel>
            </Col>
          </Row>
          <BookList books={filtered} user={this.props.currentUser} modal={this.props.modal} />
        </section>
      </div>
    )
  }
}

Home.defaultProps = {
  currentUser: null
}

Home.propTypes = {
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
  }),
  books: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  modal: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func
  }).isRequired
}

export default Home
