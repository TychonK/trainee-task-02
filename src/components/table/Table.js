import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import TableRow from './TableRow';

function Table() {
    return (
           <div className="card">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Active</th>
                        <th scope="col">Archived</th>
                    </tr>
                </thead>

                <tbody id="table-body">
                    <TableRow />
                </tbody>
        
            </table>
            </div>
    )
}

export default Table;