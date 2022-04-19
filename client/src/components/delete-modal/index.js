import { useContext } from 'react';

import ModalContext from '../../contexts/modal-context';
import { deleteContact } from '../../services/contact.service';
import './delete-modal.scss';

const DeleteModal = ({ contact, setContact }) => {
  const modalContext = useContext(ModalContext);

  const onClose = () => {
    modalContext.closeModal();
  };

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-content delete-modal'>
        <h2>Are you sure you want to delete contact?</h2>

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

export default DeleteModal;
