import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';

const CallListPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    getAllContacts().then((response) => {
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            <th key="lastName">Last Name</th>
            <th key="firstName">First Name</th>
            <th key="homePhoneNumber">Home Phone Number</th>
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data
          .filter((row) => row.phoneNumbers.some(({ phoneType }) => phoneType === 'Home'))
          .sort((a, b) => (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName))
          .map((row, rowIndex) => {
            let homePhoneNumber;
            row.phoneNumbers.forEach((item) => {
              if (item.phoneType === 'Home') {
                homePhoneNumber = item.phoneNumber
              }
            });

            return (
              <tr key={rowIndex}>
                <td key="lastName">{row.lastName}</td>
                <td key="firstName">{row.firstName}</td>
                <td key="homePhoneNumber">{homePhoneNumber}</td>
              </tr>
            )
          });
        setTableRows(rows);
      }
    })
  }, []);

  return (
    <div className="contacts-page">
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
