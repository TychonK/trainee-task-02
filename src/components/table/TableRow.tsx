import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import { useEffect } from 'react';
import { SubmitNote, State } from '../../types';
import { table } from 'console';
import { AppDispatch } from '../../redux/store';

interface Props {
    notesArr: SubmitNote[],
    onUpdate: (data: TableData) => void,
}

type TableData = {[key: string]: {active: number, archived: number}}[]

type Category = {[key: string]: {active: number, archived: number}}

const TableRow = ({ notesArr, onUpdate }: Props) => {
    
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
                    active: notesArr.filter((note) => note.category === uniqueCategory && note.archived === false).length,
                    archived: notesArr.filter((note) => note.category === uniqueCategory && note.archived === true).length
                }
            }
            return obj
        })

        return filteredCategories
    }

    const tableData = getTableData()

    const tableMarkup = (tableData: TableData) => {
            const markup = tableData.map((category: Category, index: number) => {
                const key = Object.keys(category)
                const identifier = key[0]

           return (
                        <tr key={index}>
                            <th scope="row">{key}</th>
                            <td>{category[identifier].active}</td>
                            <td>{category[identifier].archived}</td>
                        </tr>
                    )
        })
        return markup
    }
    
    return (
        <>{ tableData.length > 0 ? tableMarkup(tableData) : <h3 className="mt-3" style={{ color: 'grey', fontSize: 18 + 'px' }} >No data</h3> }</>
    )
}


const mapStateToProps = (state: State) => {
    return {
        notesArr: state.notes,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onUpdate: (data: TableData) => dispatch(actions.changeTableData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);