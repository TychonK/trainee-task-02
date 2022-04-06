import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

function Cards({ notesArr, unarchiveNote }) {
    const allArchived = notesArr.filter(note => note.archived == true)
    const cardsMarkup = allArchived.map((note, index) => {

        const markup =
            <div key={index} className="card mx-4 my-2 bg-dark text-white thatsMyNote" style={{ width: 18 + 'rem' }}>
                <div className="card-body">
                    <h6>{note.time}</h6>
                    <p className="card-text">{note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    <p className="card-text text-info">Category: {note.category}</p>
                    <button id={note.id} onClick={unarchiveNote} className="btn btn-success ms-2">Unarchive</button>
                </div>
            </div>
        
        return (
            markup
        )
    });
    
    return (
        cardsMarkup.length > 0 ? cardsMarkup : <h3 style={ { textAlign: 'center', color: 'grey',} }>Nothing to display</h3>
    )
}

const mapStateToProps = state => {
    return {
        notesArr: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unarchiveNote: (e) => dispatch(actions.unarchive(e.target.id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);