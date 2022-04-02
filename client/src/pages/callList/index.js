import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';
import './callList.scss';

const CallListPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);

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
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallListPage;