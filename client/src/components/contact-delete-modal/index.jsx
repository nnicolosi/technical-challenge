import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import ModalContext from '../../contexts/modal-context';
import { deleteContact } from '../../services/contact.service';

const ContactDeleteModal = () => {
  const modalContext = useContext(ModalContext);

  const {
    handleSubmit,
    reset,
  } = useForm();
  
  const onClose = () => {
    modalContext.closeModal();
    reset();
  };
  
  const onDelete = () => {
    deleteContact({data: modalContext.rowToDelete}).then(
      (response) => onClose(),
      (errors) => {
        console.log(errors);
    })
  };

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <form className="box contact-form" onSubmit={handleSubmit(onDelete)}>
          <div className="container page-header">
            <h6 className="title">Delete Contact</h6>
          </div>
          <hr />
          <p className="content">Delete this contact? This action CANNOT be undone.</p>
          <div className="buttons is-centered">
            <button type="button" className="button is-primary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button is-danger">
              Delete
            </button>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default ContactDeleteModal;
