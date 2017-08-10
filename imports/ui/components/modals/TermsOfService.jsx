import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button.js'

const weOwnYouNow = close => () => {
  window.alert('We own your soul now. Kthx.')
  close()
}

export const TermsOfServiceModalBody = () => (
  <div>
    <p>By signing up for our application you agree to the following terms and conditions:</p>
    <ul>
      <li>We can drive your car whenever we want.</li>
      <li>We can blackmail you based on the data you add to our app.</li>
      <li>You will bring us anything we want, whenever we want it...or die.</li>
      <li>Give us unlimited access to your funds.</li>
    </ul>
    <p>Do you agree to the worst terms ever?</p>
  </div>
)

export const TermsOfServiceModalFooter = ({ modal }) => (
  <div>
    <Button onClick={modal.close} bsStyle='default'>{ 'No, You\'re Crazy.' }</Button>
    <Button onClick={weOwnYouNow(modal.close)} bsStyle='success'>Totally</Button>
  </div>
)

TermsOfServiceModalFooter.propTypes = {
  modal: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func
  }).isRequired
}
