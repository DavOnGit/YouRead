import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal.js'

const renderBodyFooter = (form, body, footer) => (
  form || (
  <div>
    <Modal.Body>
      { body }
    </Modal.Body>
    <Modal.Footer>
      { footer }
    </Modal.Footer>
  </div>
))

const AppModal = ({ show, className, title, form, body, footer, onHide, size }) => (
  <Modal show={show} onHide={onHide} className={className} bsSize={size}>
    <Modal.Header closeButton>
      <Modal.Title>{ title }</Modal.Title>
    </Modal.Header>
    { renderBodyFooter(form, body, footer) }
  </Modal>
)

AppModal.defaultProps = {
  show: false,
  className: undefined,
  title: undefined,
  form: undefined,
  body: undefined,
  footer: undefined,
  onHide: undefined,
  size: undefined
}

AppModal.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  form: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  onHide: PropTypes.func,
  size: PropTypes.string
}

export default AppModal
