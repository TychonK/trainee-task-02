import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import NothingToDisplay from './NothingToDisplay'

function Cards({ notesArr, removeNote, archiveNote, openModal }) {

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
                    <button id={note.id} onClick={openModal} className="btn btn-info">Edit</button>
                    <button id={note.id} onClick={archiveNote} className="btn btn-success ms-2">Archive</button>
                    <button id={note.id} onClick={removeNote} className="btn btn-danger ms-2">Delete</button>
                </div>
            </div>
        
        return (
            markup
        )
    });
    
    return (
        cardsMarkup.length > 0 ? cardsMarkup : <NothingToDisplay />
    )
}

const mapStateToProps = state => {
    return {
        notesArr: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeNote: (e) => dispatch(actions.removeNote(e.target.id)),
        archiveNote: (e) => dispatch(actions.archive(e.target.id)),
        openModal: (e) => dispatch(actions.openModal(e.target.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);