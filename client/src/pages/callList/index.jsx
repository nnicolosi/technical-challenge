import { useEffect, useState } from "react"
import { getAllContacts } from "../../services/contact.service"

const CallList = () => {

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

                const rows = response.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
                cellIndex === 2 ? <td>{formatCell(cell)}</td> :
                cellIndex === 1 ? <td>{formatCell(cell)}</td> :
                cellIndex === 4 ? <td>{formatCell(cell)}</td> :
                null
            ))}
            </tr>
                ))
                setTableRows(rows)
            }
        })
    },[])
    return (
        <div className="contacts-page">
            <div className="section">
                <div className="container">
                    <div className="container page-header">
                        <h6 className="title">Contacts</h6>
                    </div>
                    <hr />
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th>
                                LAST NAME
                                </th>
                                <th>
                                FIRST NAME
                                </th>
                                <th>
                                HOME PHONE
                                </th>
                            </tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CallList