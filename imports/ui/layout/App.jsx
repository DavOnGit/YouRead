import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import Grid from 'react-bootstrap/lib/Grid.js'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { NotificationContainer } from 'react-notifications'

import Books from '../../api/books/books.js'
import Authenticated from '../pages/Authenticated.jsx'
import Public from '../pages/Public.jsx'
import PropsRoute from '../pages/PropsRoute.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import NotFound from '../pages/NotFound.jsx'
import modals from '../../modules/modals.jsx'
import Modal from '../components/modals/Modal.jsx'
import NavigationBar from '../components/Navbar.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

class App extends React.PureComponent {
  state = {
    modalShow: false,
    modalClasses: null,
    modalTitle: null,
    modalForm: null,
    modalBody: null,
    modalFooter: null,
    modalSize: null
  }
  
  getChildContext () {
    const { loggingIn, authenticated, currentUser } = this.props
    return {
      loggingIn,
      authenticated,
      currentUser,
      modal: this.modal
    }
  }
  
  componentWillMount() {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }
  }
  
  setModal = ({ modal, show, props }) => {
    const modalToSet = modal ? modals[modal](props, this.modal) : {}

    this.setState(Object.assign({ modalShow: show }, modalToSet), () => {
      if (!show) { this.resetModal() }
    })
  }
  
  resetModal = () => {
    this.setState({
      modalClasses: null,
      modalTitle: null,
      modalForm: null,
      modalBody: null,
      modalFooter: null,
      modalSize: null
    })
  }

  modal = {
    open: (modal, modalProps) => {
      this.setModal({ modal, show: true, props: modalProps })
    },
    close: () => {
      this.setModal({ show: false })
    }
  }

  render () {
    const {
      modalShow,
      modalClasses,
      modalTitle,
      modalForm,
      modalBody,
      modalFooter,
      modalSize
    } = this.state
    
    const { authenticated, currentUser, userSubReady } = this.props
    const NavWithRouter = withRouter(NavigationBar)
    const appProps = { ...this.props, modal: this.modal }
    
    return (
      <Router>
        <div className='app-container'>
          <Grid className='grid' fluid>
            <Switch>
              <PropsRoute exact path='/' component={Home} appProps={appProps} />
              <Route path='/about' component={About} />
              <Public path='/login' component={Login} />
              <Public path='/signup' component={Signup} />
              <Authenticated exact path='/dashboard' component={Dashboard} appProps={appProps} />
              <Route component={NotFound} />
            </Switch>
          </Grid>

          <NavWithRouter
            authenticated={authenticated}
            userName={authenticated ? currentUser.username : undefined}
            email={authenticated ? currentUser.emails[0].address : undefined}
            userSubReady={userSubReady}
          />

          <Modal
            show={modalShow}
            className={modalClasses}
            title={modalTitle}
            form={modalForm}
            body={modalBody}
            footer={modalFooter}
            onHide={this.modal.close}
            size={modalSize}
          />

          <NotificationContainer />
          <ScrollToTop />
        </div>
      </Router>
    )
  }
}

App.defaultProps = {
  loggingIn: false,
  authenticated: false,
  currentUser: null,
  userSubReady: false,
  books: []
}

App.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
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
  userSubReady: PropTypes.bool.isRequired
}

App.childContextTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  currentUser: PropTypes.object,
  modal: PropTypes.object
}

export default createContainer(() => {
  const userData = Meteor.subscribe('userData')
  Meteor.subscribe('books:all')
  const userSubReady = userData.ready()

  const loggingIn = Meteor.loggingIn()
  const currentUser = Meteor.user()
  
  return {
    loggingIn,
    authenticated: !loggingIn && !!currentUser && !!currentUser._id,
    currentUser,
    userSubReady,
    books: Books.find({}, { sort: { 'volumeInfo.title': 1 } }).fetch()
  }
}, App)
