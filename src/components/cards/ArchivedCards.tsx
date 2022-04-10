import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import NothingToDisplay from './NothingToDisplay';


import { SubmitNote, State } from '../../types'
import { AppDispatch } from '../../redux/store';
import { MouseEventHandler } from 'react';

interface Props {
    notesArr: SubmitNote[],
    unarchiveNote: (id: string) => void
}

function Cards({ notesArr, unarchiveNote }: Props) {
    const handleUnarchiveNote: MouseEventHandler<HTMLButtonElement> = (e) => {
        unarchiveNote((e.target! as HTMLButtonElement).id)
    }

    const allArchived = notesArr.filter(note => note.archived == true)

    const cardsMarkup = allArchived.map((note, index) => {

        const markup =
            <div key={index} className="card mx-4 my-2 bg-secondary text-white thatsMyNote" style={{ width: 18 + 'rem' }}>
                <div className="card-body">
                    <h6>{note.time}</h6>
                    <p className="card-text">{note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    <p className="card-text text-info">Category: {note.category}</p>
                    <button id={note.id} onClick={handleUnarchiveNote} className="btn btn-success">Unarchive</button>
                </div>
            </div>
        
        return (
            markup
        )
    });
    
    return (
       <>{cardsMarkup.length > 0 ? cardsMarkup : <NothingToDisplay /> }</> 
    )
}

const mapStateToProps = (state: State) => {
    return {
        notesArr: state.notes,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        unarchiveNote: (id: string) => dispatch(actions.unarchive(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);