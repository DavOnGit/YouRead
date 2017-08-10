import React from 'react'
import Alert from 'react-bootstrap/lib/Alert.js'

const NotFound = () => (
  <div className='not-found'>
    <Alert bsStyle='danger'>
      <p><strong>Error [404]</strong>: { window.location.pathname } does not exist.</p>
    </Alert>
  </div>
)

export default NotFound
