import { useContext } from 'react';

import ModalContext from '../../contexts/modal-context';
import { deleteContact } from '../../services/contact.service';
import './delete-contact-modal.scss';

const DeleteContactModal = ({ contact, setContact }) => {
  const modalContext = useContext(ModalContext);

  const onClose = () => {
    modalContext.closeModal();
  };

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-content delete-modal'>
        <h2>Are you sure you want to do this?</h2>

        <div className='buttons is-centered'>
          <button
            type='submit'
            className='button is-primary'
            onClick={() => {
              deleteContact(contact);
              onClose();
            }}
          >
            Submit
          </button>
          <button
            type='button'
            className='button is-primary'
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactModal;
