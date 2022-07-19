import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';

const ListCallPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    getAllContacts().then((response) => {
      console.log({response})
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
          .filter((element) => {
            var haveNumbers = element.phoneNumbers && element.phoneNumbers.length > 0
            var returnVal = false
            if (haveNumbers) {
              element.phoneNumbers.forEach((numberObj) => {
                if (numberObj.phoneType === 'Home') {
                  returnVal = true
                  element.homePhoneNumber = numberObj.phoneNumber
                }
              }
            )}
            return (returnVal)
          })
          .sort((a, b) => {
            if (a.lastName === b.lastName) {
              return (a.firstName < b.firstName ? -1 : 1)
            }
            return(a.lastName < b.lastName ? -1 : 1)
          })
          .map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key="lastName">{row.lastName}</td>
              <td key="firstName">{row.firstName}</td>
              <td key="homePhoneNumber">{row.homePhoneNumber}</td>
            </tr>
          ));
        setTableRows(rows);
      }
    });
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

export default ListCallPage;