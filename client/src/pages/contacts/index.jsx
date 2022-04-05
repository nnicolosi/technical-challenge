import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteContact, getAllContacts, editContact } from '../../services/contact.service';
import ContactModal from '../../components/contact-modal';
import ModalContext from '../../contexts/modal-context';
import './contacts.scss';

const ContactsPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(undefined);
  const [formDisabled, setFormDisabled] = useState(false);
  const [editId, setEditId] = useState(null)
  const {
    handleSubmit,
    register,
    reset,
  } = useForm();

  const formatHeader = (header) => {
    return header.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase();
  };

  const formatCell = (cell) => {
    if (typeof cell === 'boolean') {
      return cell ? 'Yes' : 'No';
    }

    return cell;
  };

  const deleteRow = (id) => {
    deleteContact(id)
    window.location.reload()
  }

  const onValid = (data) => {
    if(data.firstName === '')data.firstName=undefined
    if(data.lastName === '')data.lastName=undefined
    if(data.emailAddress === '')data.emailAddress=undefined
    data.id=editId
    setFormDisabled(true)
    editContact(data).then(
      (response) => {
        reset()
        setFormDisabled(false)
        window.location.reload()
      },
      (errors) => {
        console.log(errors)
      }
    )
  }

  useEffect(() => {
    getAllContacts().then((response) => {
      console.log(response.data[0].phoneNumbers)
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            {Object.getOwnPropertyNames(response.data[0]).map((header, index) => (
              <th key={index}>{formatHeader(header)}</th>
            ))}
            <th>DELETE</th>
            <th>EDIT</th>
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data.map((row, rowIndex) => (
          editRow === rowIndex ?
          <tr key={rowIndex}>
            
            {Object.values(row).map((cell, cellIndex) => (
              cellIndex === 0 ? <td key={cellIndex}>
                <input {...register('id')}
                disabled={true}
                value={formatCell(cell)}/></td> :
              cellIndex === 1 ? <td key={cellIndex}>
                <input {...register('firstName')}
                type='text'
                disabled={formDisabled}
                placeholder={formatCell(cell)}/></td> :
              cellIndex === 2 ? <td key={cellIndex}>
                <input {...register('lastName')}
                type='text'
                disabled={formDisabled}
                placeholder={formatCell(cell)}/></td> :
              cellIndex === 3 ? <td key={cellIndex}>
                <input {...register('emailAddress')}
                type='text'
                disabled={formDisabled}
                placeholder={formatCell(cell)}/></td> :
              <td>{formatCell(cell)}</td>
          ))}
            <td>
              <button className="button is-secondary" onClick={()=>deleteRow(row.id)}>DELETE</button>
            </td>
            <td>
              <button type="submit" className="button is-secondary" disabled={formDisabled}>SAVE</button>
            </td>
          </tr>
          :
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{formatCell(cell)}</td>
            ))}
            <td>
              <button className="button is-secondary" onClick={()=>deleteRow(row.id)}>DELETE</button>
            </td>
            <td>
              <button className="button is-secondary" onClick={(e)=>{e.preventDefault()
                setEditRow(rowIndex)
                setEditId(row.id)
                }}>EDIT</button>
            </td>
          </tr>
        ));
        setTableRows(rows);
      }
    });
  }, [showModal, editRow]);

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
          <form onSubmit={handleSubmit(onValid)}>
            <table className="table is-fullwidth is-hoverable">
              <thead>{tableHeaders}</thead>
              <tbody>{tableRows}</tbody>
            </table>
          </form>
        </div>
      </div>
      <ModalContext.Provider value={{ showModal: showModal, closeModal: () => setShowModal(false) }}>
        <ContactModal />
      </ModalContext.Provider>
    </div>
  );
};

export default ContactsPage;
