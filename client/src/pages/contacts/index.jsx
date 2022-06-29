import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';
import ContactModal from '../../components/contact-modal';
import ModalContext from '../../contexts/modal-context';
import './contacts.scss';

const ContactsPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState({})

  // We pass the entire row data (contact) to this handler when a row is clicked.
  // We set the value of `selectedContact` to the row data and pass `selectedContact`
  // into `ModalContext` which allows the modal to populate the fields with the contact info.
  const onRowClick = (rowData) => {
    setSelectedContact(rowData);
    setShowModal(true);
  };

  // Every time the modal is closed we should reset the value of `selectedContact`
  const closeModal = () => {
    setShowModal(false);
    setSelectedContact({});
  };

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
            <tr key={rowIndex} onClick={() => onRowClick(row)}>
              <td key="id">{row.id}</td>
              <td key="lastName">{row.lastName}</td>
              <td key="firstName">{row.firstName}</td>
              <td key="emailAddress">{row.emailAddress}</td>
              <td key="phoneTypes">{row.phoneNumbers.map((p) => p.phoneType).join(', ')}</td>
            </tr>
          ));
        setTableRows(rows);
      }
    });
  }, [showModal]);

  return (
    <div className="contacts-page">
      <div className="section">
        <div className="container">
          <div className="container page-header">
            <h6 className="title">Contacts</h6>
            <button className="button is-primary create-contact-button" onClick={() => setShowModal(true)}>
              Create Contact
            </button>
          </div>
          <hr />
          <table className="table is-fullwidth is-hoverable">
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
      <ModalContext.Provider value={{ showModal, selectedContact, closeModal }}>
        <ContactModal />
      </ModalContext.Provider>
    </div>
  );
};

export default ContactsPage;
