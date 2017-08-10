import React from 'react';
import {
  TermsOfServiceModalBody,
  TermsOfServiceModalFooter } from '../ui/components/modals/TermsOfService.jsx'
import {
  ConfirmRemoveBookModalBody,
  ConfirmRemoveBookModalFooter } from '../ui/components/modals/ConfirmRemoveBook.jsx'
import {
  BookRequestModalBody,
  BookRequestModalFooter } from '../ui/components/modals/ConfirmBookRequest.jsx'
import SetUserLocationModal from '../ui/components/modals/SetUserLocation.jsx'

export default {
  acceptTerms: (props, modal) => (
    {
      modalClasses: 'termsOfServiceModal',
      modalTitle: 'Accept Terms of Service',
      modalBody: <TermsOfServiceModalBody {...props} modal={modal} />,
      modalFooter: <TermsOfServiceModalFooter {...props} modal={modal} />
    }
  ),
  confirmRemoveBook: (props, modal) => (
    {
      modalClasses: 'removeBookDialog',
      modalTitle: props.title,
      modalBody: <ConfirmRemoveBookModalBody {...props} modal={modal} />,
      modalFooter: <ConfirmRemoveBookModalFooter {...props} modal={modal} />,
      modalSize: props.size
    }
  ),
  bookRequest: (props, modal) => (
    {
      modalClasses: 'requestBookDialog',
      modalTitle: props.title,
      modalBody: <BookRequestModalBody {...props} modal={modal} />,
      modalFooter: <BookRequestModalFooter {...props} modal={modal} />,
      modalSize: props.size
    }
  ),
  setUserLocation: (props, modal) => (
    {
      modalClasses: 'setLocationModal',
      modalTitle: props.title,
      modalForm: <SetUserLocationModal {...props} modal={modal} />
    }
  )
}
