import React from 'react';

const ModalContext = React.createContext({
  showModal: false,
  closeModal: () => {},
});

export default ModalContext;
