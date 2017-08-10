import React from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup, ControlLabel, Modal } from 'react-bootstrap'
// import { Meteor } from 'meteor/meteor'

export default class AddDocumentModalForm extends React.Component {

  handleAddDocument = (event) => {
    event.preventDefault()
    this.props.modal.close()
  }

  render () {
    const { modal } = this.props;

    return (
      <form onSubmit={this.handleAddDocument} >
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <input
              ref={title => (this.title = title)}
              type='text'
              name='title'
              className='form-control'
            />
          </FormGroup>
          <ControlLabel>Body</ControlLabel>
          <textarea
            ref={body => (this.body = body)}
            name='body'
            className='form-control'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={modal.close} bsStyle='default'>Cancel</Button>
          <Button type='submit' bsStyle='success'>Add Document</Button>
        </Modal.Footer>
      </form>
    );
  }
}

AddDocumentModalForm.defaultProps = {
  modal: undefined
}

AddDocumentModalForm.propTypes = {
  modal: PropTypes.object
}
