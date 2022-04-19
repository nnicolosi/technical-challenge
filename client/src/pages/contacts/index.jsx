import { React, useEffect, useState } from 'react';
import { deleteContact, getAllContacts, getContactById } from '../../services/contact.service';
import ContactModal from '../../components/contact-modal';
import DeleteModal from '../../components/delete-modal';
import ModalContext from '../../contexts/modal-context';
import './contacts.scss';

const ContactsPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [contactModal, setContactModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [contact, setContact] = useState()


  useEffect(() => {
    getAllContacts().then((response) => {
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            <th key="id">Id</th>
            <th key="lastName">Last Name</th>
            <th key="firstName">First Name</th>
            <th key="emailAddress">Email Address</th>
            <th key="phoneTypes">Phone Types</th>
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data
          .sort((a, b) => a.id - b.id)
          .map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key='id'>{row.id}</td>
              <td key='lastName'>{row.lastName}</td>
              <td key='firstName'>{row.firstName}</td>
              <td key='emailAddress'>{row.emailAddress}</td>
              <td key='phoneTypes'>
                {row.phoneNumbers.map((p) => p.phoneType).join(', ')}
              </td>
              <td>
                <button onClick={() => {
                  getContactById(row.id).then(response => {
                    setContact(response.data)
                    setContactModal(true)
                  })
                    .catch(err => {
                    throw new Error(err)
                  })
                }
                }>Edit</button>
              </td>
              <td>
                <button onClick={() => {
                  setContact(row.id)
                  setDeleteModal(true)
                }}>Delete</button>
              </td>
            </tr>
          ));
        setTableRows(rows);
      }
    });
  }, [contactModal, deleteModal]);

  return (
    <div className='contacts-page'>
      <div className='section'>
        <div className='container'>
          <div className='container page-header'>
            <h6 className='title'>Contacts</h6>
            <button
              className='button is-primary create-contact-button'
              onClick={() => setContactModal(true)}
            >
              Create Contact
            </button>
          </div>
          <hr />
          <table className='table is-fullwidth is-hoverable'>
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
      <ModalContext.Provider
        value={{ showModal: contactModal, closeModal: () => setContactModal(false) }}
      >
        <ContactModal contact={contact} setContact={setContact} />
      </ModalContext.Provider>
      <ModalContext.Provider
        value={{ showModal: deleteModal, closeModal: () => setDeleteModal(false) }}
      >
        <DeleteModal contact={contact} />
      </ModalContext.Provider>
    </div>
  );
};

export default ContactsPage;
