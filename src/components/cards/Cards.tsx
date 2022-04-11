import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import NothingToDisplay from './NothingToDisplay'

import { SubmitNote, State } from '../../types'
import { MouseEventHandler } from 'react'
import { AppDispatch } from '../../redux/store'

interface Props {
    notesArr: SubmitNote[],
    removeNote: (id: string) => void,
    archiveNote: (id: string) => void,
    openModal: (id: string) => void,
}


function Cards({ notesArr, removeNote, archiveNote, openModal }: Props) {

    const handleOpenModal: MouseEventHandler<HTMLButtonElement> = (e) => {
        openModal((e.target! as HTMLButtonElement).id)
    }

    const handleArchiveNote: MouseEventHandler<HTMLButtonElement> = (e) => {
        archiveNote((e.target! as HTMLButtonElement).id)
    }

    const handleRemoveNote: MouseEventHandler<HTMLButtonElement> = (e) => {
        removeNote((e.target! as HTMLButtonElement).id)
    }
    
    const allActive = notesArr.filter(note => note.archived == false)

    const dates = allActive.map(note => {
            const dateType = /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g;

            const isMatch = [...note.text.matchAll(dateType)]
            const foundDates = isMatch.map(match => {
                return match[0]
            })

            let dates = '';

            if (foundDates.length > 0) {
                foundDates.forEach(date => {
                    dates += '| ' + date + ' | '
                })
            }

            return dates
    })

    const cardsMarkup = allActive.map((note, index) => {
        const markup =
            <div key={index} className="card mx-4 my-2 bg-dark text-white thatsMyNote" style={{ width: 18 + 'rem' }}>
                <div className="card-body">
                    <h6>{note.time}</h6>
                    <p className="card-text">{note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    <p className="card-text text-info">Category: {note.category}</p>
                    {dates[index].length > 0 ? <p className='card-text text-danger'>DATES: {dates[index]}</p> : null}
                    <button id={note.id} onClick={handleOpenModal} className="btn btn-info">Edit</button>
                    <button id={note.id} onClick={handleArchiveNote} className="btn btn-success ms-2">Archive</button>
                    <button id={note.id} onClick={handleRemoveNote} className="btn btn-danger ms-2">Delete</button>
                </div>
            </div>
        
        return (
            markup
        )
    });
    
    return (
        <>{ cardsMarkup.length > 0 ? cardsMarkup : <NothingToDisplay /> }</>
    )
}

const mapStateToProps = (state: State) => {
    return {
        notesArr: state.notes,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        removeNote: (id: string) => dispatch(actions.removeNote(id)),
        archiveNote: (id: string) => dispatch(actions.archive(id)),
        openModal: (id: string) => dispatch(actions.openModal(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);