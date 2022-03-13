import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';
import ContactModal from '../../components/contact-modal';
import ModalContext from '../../contexts/modal-context';
import './contacts.scss';

const ContactsPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const formatHeader = (header) => {
    return header.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase();
  };

  const formatCell = (cell) => {
    if (typeof cell === 'boolean') {
      return cell ? 'Yes' : 'No';
    }

    return cell;
  };

  useEffect(() => {
    getAllContacts().then((response) => {
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            {Object.getOwnPropertyNames(response.data[0]).map((header, index) => (
              <th key={index}>{formatHeader(header)}</th>
            ))}
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{formatCell(cell)}</td>
            ))}
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
      <ModalContext.Provider value={{ showModal: showModal, closeModal: () => setShowModal(false) }}>
        <ContactModal />
      </ModalContext.Provider>
    </div>
  );
};

export default ContactsPage;
