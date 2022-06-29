import { useContext, useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import ModalContext from '../../contexts/modal-context';
import { createContact, updateContact, deleteContact } from '../../services/contact.service';
import './contact-modal.scss';

const ContactModal = () => {
  const modalContext = useContext(ModalContext);
  const [formDisabled, setFormDisabled] = useState(false);
  // destructure `selectedContact` from `modalContext` and use it to populate default form values if it contains data.
  const { selectedContact } = modalContext
  // assume that we are editing a contact if `selectedContact` is hydrated
  const update = !!Object.keys(selectedContact).length

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    setError,
  } = useForm();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  // delegates between `createContact()` (if `update` === false) and `updateContact()` (if `update` === true)
  const submitContact = (data) => {
    if (!update) {
      return createContact(data)
    } else {
      const { id } = selectedContact
      return updateContact({...data, id})
    }
  }

  const onValid = (data) => {
    setFormDisabled(true);
    submitContact(data).then(
      (response) => {
        console.log('in response')
        console.log(response)
        modalContext.closeModal();
        reset();
        setFormDisabled(false);
      },
      (errors) => {
        // The backend will return a specific error message when it cannot validate the
        // value of `emailAddress` as an email address, utilizing the 'validator' library
        // to check against the string. The regex used by `useForm()` to validate the email
        // is not equivalent (nor as robust) as the 'validator' library.
        //
        // This is a quick and dirty band-aid that will display an error message to the user
        // when `useForm()` validation passes and the backend validation fails while attempting 
        // to create a new contact. 
        //
        // If a contact is being updated the backend will not validate the value of `emailAddress` 
        // and the regex pattern passed to `useForm()` becomes the only validation. This results in 
        // inconsistent behavior between "creating" and "updating" a contact and should be addressed
        // in the future.  
        const [ errorMessage ] = errors.response.data.message
        if (errorMessage === 'emailAddress must be an email') {
          setError('emailAddress',  { type: 'pattern' })
        }
        setFormDisabled(false);
      }
    );
  };

  const onDeleteContact = () => {
    setFormDisabled(true);
    deleteContact(selectedContact).then(
      (response) => {
        modalContext.closeModal();
        reset();
        setFormDisabled(false);
      },
      (errors) => {
        setFormDisabled(false);
      }
    );
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
 
  useEffect(() => {
    // if `update` is true then we want to update the form values with existing data
    if (update) {
      const { firstName, lastName, emailAddress, phoneNumbers } = selectedContact
      setValue('firstName', firstName)
      setValue('lastName', lastName)
      setValue('emailAddress', emailAddress)
      phoneNumbers.forEach((item) => {
        append({...item})
      })
    }
  }, [update, selectedContact, append, setValue])

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <form className="box contact-form" onSubmit={handleSubmit(onValid)}>
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
              Submit
            </button>
            {
              update &&
                <button type="button" className="button is-primary" disabled={formDisabled} onClick={onDeleteContact}>
                  Delete
                </button>
            }
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default ContactModal;
