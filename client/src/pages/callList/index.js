import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';
import './callList.scss';

const CallListPage = () => {
  const [tableRows, setTableRows] = useState([]);

  const formatCell = (cell) => {
    if (typeof cell === 'boolean') {
      return cell ? 'Yes' : 'No';
    }

    return cell;
  };

  useEffect(() => {
    getAllContacts().then((response) => {
      if (response.data && response.data.length) {
        console.log(response.data)
        // Put data into an array and sort it alphabetically by last name, then first name
        const callList = response.data.sort((a, b) => {
          const sortByLast = a.lastName.localeCompare(b.lastName);
          return sortByLast !== 0 ? sortByLast : a.firstName.localeCompare(b.firstName);
        })

        const rows = response.data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              cellIndex === 2 ? <td>{formatCell(cell)}</td> :
              cellIndex === 1 ? <td>{formatCell(cell)}</td> :
              // This SHOULD be an array of phone numbers
              cellIndex === 4 ? <td>{formatCell(cell)}</td> :
              null
            ))}
          </tr>
        ))
        setTableRows(rows);
      }
    });
  }, []);

  return (
    <div className="callList-page">
      <div className="section">
        <div className="container">
          <div className="container page-header">
            <h6 className="title">Call List</h6>
          </div>
          <hr />
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>HOME PHONE</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallListPage;