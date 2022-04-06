import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import { useEffect } from 'react';

function TableRow({ notesArr, onUpdate }) {
    
    useEffect(() => {
        const data = getTableData()
        onUpdate(data)
    })

    const getTableData = () => {
        const allCategories = notesArr.map(note => {
            return note.category
        })

        const uniqueCategories = Array.from(new Set(allCategories))

        const filteredCategories = uniqueCategories.map(uniqueCategory => {
            const obj = {
                [uniqueCategory]: {
                    active: notesArr.filter(note => note.category === uniqueCategory && note.archived === false).length,
                    archived: notesArr.filter(note => note.category === uniqueCategory && note.archived === true).length
                }
            }
            return obj
        })

        return filteredCategories
    }

    const tableData = getTableData()

    const tableMarkup = (tableData) => {
        const markup = tableData.map((category, index) => {
            const key = Object.keys(category)

           return (
                        <tr key={index}>
                            <th scope="row">{key}</th>
                            <td>{category[key].active}</td>
                            <td>{category[key].archived}</td>
                        </tr>
                    )
        })
        return markup
    }
    
    return (
        tableData.length > 0 ? tableMarkup(tableData) : <h3 className="mt-3" style={{ color: 'grey', fontSize: 18 + 'px'} } >No data</h3>
    )
}


const mapStateToProps = state => {
    return {
        notesArr: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: (data) => dispatch(actions.changeTableData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);