import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/Angeler.css';

import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ModalData, State, SubmitEdit } from '../../types';
import { AppDispatch } from '../../redux/store';

interface Props {
    modalData: ModalData,
    closeModal: () => void,
    submitEdit: (cred: SubmitEdit) => void,
}

function Modal({ modalData, closeModal, submitEdit }: Props) {
    const [text, setText] = useState(modalData.text);
    const [category, setCategory] = useState(modalData.category);
    const [noteId, setNoteId] = useState(modalData.id)

    const handleNoteText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleNoteCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }

    const handleSubmitEdit = (e: FormEvent) => {
        if (text === '') {
            alert({text: 'Please write something in your note', type: 'notice', delay: 2500, styling: 'angeler', icons: 'angeler'})
            return
        } else if (category == 'null') {
            alert({ text: 'PLease select a category', type: 'notice', delay: 2000, styling: 'angeler', icons: 'angeler' })
            return
        }


        const editObj = { text: text, category: category, id: (e.target as HTMLButtonElement).id }

        submitEdit(editObj)

        setCategory('')
        setText('')
        setNoteId('')

        closeModal()
    }

    return (
        <div className="modal" tabIndex={-1} id="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit your note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <textarea id="modal-input-text" className="form-control" aria-label="With textarea" value={text} onChange={handleNoteText}></textarea>
                            <p className="card-text mt-3 font-weight-bold">Select category</p>
                            <select className="form-select" id="modal-selection" value={category} onChange={handleNoteCategory}>
                                <option value="null">Pick category</option>
                                <option value="task">Task</option>
                                <option value="idea">Idea</option>
                                <option value="random thought">Random thought</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                        <button id={noteId} onClick={handleSubmitEdit} type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
   )
}

const mapStateToProps = (state: State) => {
    return {
        modalData: state.modal,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        closeModal: () => dispatch(actions.closeModal()),
        submitEdit: (editObj: SubmitEdit) => dispatch(actions.edit(editObj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);