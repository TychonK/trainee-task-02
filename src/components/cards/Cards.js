import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

function Cards({ notesArr, removeNote }) {
    const cardsMarkup = notesArr.map((note, index) => {
        return (
            <div key={index} className="card mx-4 my-2 bg-dark text-white thatsMyNote" style={{ width: 18 + 'rem' }}>
				<div className="card-body">
					<h6>{note.time}</h6>
					<p className="card-text">{note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    {note.dates ? <p className="card-subtitle mb-2 text-warning">DATE: {note.dates}</p> : ''}
                    <p className="card-text text-info">Category: {note.category}</p>
                    <button id={index} className="btn btn-info">Edit</button>
                    <button id={index} className="btn btn-success ms-2">Archive</button>
                    <button id={index} onClick={removeNote} className="btn btn-danger ms-2">Delete</button>
				</div>
			</div>
        )
    });
    
    return (
        cardsMarkup
    )
}

const mapStateToProps = state => {
    return {
        notesArr: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeNote: (e) => dispatch(actions.removeNote(e.target.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);