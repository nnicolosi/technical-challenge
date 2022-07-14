import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import ModalContext from '../../contexts/modal-context';
import { createContact, updateContact } from '../../services/contact.service';
import './contact-modal.scss';

const ContactModal = () => {
  const modalContext = useContext(ModalContext);
  const [formDisabled, setFormDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  const onValid = (data) => {
    setFormDisabled(true);
    if (editMode) {
      updateContact({...data, id: modalContext.rowToEdit.id}).then(
        (response) => {
          modalContext.closeModal();
          reset();
          setFormDisabled(false);
        },
        (errors) => {
          setFormDisabled(false);
        }
      );
    } else {
      createContact(data).then(
        (response) => {
          modalContext.closeModal();
          reset();
          setFormDisabled(false);
        },
        (errors) => {
          setFormDisabled(false);
        }
      );
    }
  };

  const onClose = () => {
    modalContext.closeModal();
    reset();
  };

  const getPhoneNumberError = (index) => {
    if (errors.phoneNumbers && errors.phoneNumbers[index] && errors.phoneNumbers[index].phoneNumber) {
      return errors.phoneNumbers[index].phoneNumber;
    }
  };

  const getPhoneTypeError = (index) => {
    if (errors.phoneNumbers && errors.phoneNumbers[index] && errors.phoneNumbers[index].phoneType) {
      return errors.phoneNumbers[index].phoneType;
    }
  };
  useEffect(()=>{
    if (Object.keys(modalContext.rowToEdit).length === 0){
      setEditMode(false)
    } else {
      setEditMode(true)
      reset({
        firstName: modalContext.rowToEdit.firstName,
        lastName: modalContext.rowToEdit.lastName,
        emailAddress: modalContext.rowToEdit.emailAddress
      })
      modalContext.rowToEdit.phoneNumbers.forEach((number)=> {
        append({phoneNumber: number.phoneNumber, phoneType: number.phoneType})
      })
    }
  }, [modalContext.rowToEdit, reset, append])

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <form className="box contact-form" onSubmit={handleSubmit(onValid)}>
          <div className="container page-header">
            <h6 className="title"> {editMode ? "Edit Contact" : "Create Contact"} </h6>
          </div>
          <hr />
          <div className="field">
            <label className="label">
              First Name<span className="required">*</span>
              <span className="error">{errors.firstName?.type === 'required' && 'Required'}</span>
            </label>
            <div className="control">
              <input
                {...register('firstName', { required: true })}
                className={`input ${errors.firstName ? 'error' : ''}`}
                type="text"
                disabled={formDisabled}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Last Name<span className="required">*</span>
              <span className="error">{errors.lastName?.type === 'required' && 'Required'}</span>
            </label>
            <div className="control">
              <input
                {...register('lastName', { required: true })}
                className={`input ${errors.lastName ? 'error' : ''}`}
                type="text"
                disabled={formDisabled}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Email Address
              <span className="error">{errors.emailAddress?.type === 'pattern' && 'Invalid email'}</span>
            </label>
            <div className="control">
              <input
                {...register('emailAddress', { pattern: /^\S+@\S+\.\S+$/i })}
                className={`input ${errors.emailAddress ? 'error' : ''}`}
                type="text"
                disabled={formDisabled}
              />
            </div>
          </div>
          <br />
          <div>
            {fields.map((item, index) => (
              <div key={`phone-number-${index}`} className="field-row">
                <div className="field phone-number">
                  <label className="label">
                    Phone Number<span className="required">*</span>
                    <span className="error">{getPhoneNumberError(index)?.type === 'required' && 'Required'}</span>
                  </label>
                  <div className="control">
                    <input
                      {...register(`phoneNumbers.${index}.phoneNumber`, { required: true })}
                      className={`input ${getPhoneNumberError(index) ? 'error' : ''}`}
                      type="text"
                      disabled={formDisabled}
                      placeholder="Enter phone number (required)"
                    />
                  </div>
                </div>
                <div className="field phone-type">
                  <label className="label">
                    Phone Type<span className="required">*</span>
                    <span className="error">{getPhoneTypeError(index)?.type === 'required' && 'Required'}</span>
                  </label>
                  <div className="control select">
                    <select
                      {...register(`phoneNumbers.${index}.phoneType`, { required: true })}
                      className={`${getPhoneTypeError(index) ? 'error' : ''}`}
                      placeholder="Enter phone type (required)"
                    >
                      <option value="">Enter Phone Type (required)</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Mobile">Mobile</option>
                    </select>
                  </div>
                </div>
                <div className="field phone-remove">
                  <button type="button" className="button is-danger" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div>
              <button type="button" className="button is-primary" onClick={() => append({})}>
                Add Phone Number
              </button>
            </div>
          </div>
          <br />
          <div className="buttons is-centered">
            <button type="submit" className="button is-primary" disabled={formDisabled}>
              {editMode ? 'Save' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default ContactModal;
