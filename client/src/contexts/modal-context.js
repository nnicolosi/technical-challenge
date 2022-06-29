import React from 'react';

const ModalContext = React.createContext({
  showModal: false,
  closeModal: () => {},
  selectedContact: {},  // used to populate form with an existing contact's info
});

export default ModalContext;
