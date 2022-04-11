import { alert, defaultModules, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/Angeler.css';


import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { ChangeEvent, useState } from 'react'

import {v4 as uuid} from 'uuid'

import Switch from './Switch'
import { AppDispatch } from '../../redux/store';
import { SubmitNote } from '../../types';

defaultModules.set(PNotifyMobile, {});
defaults.closerHover = false;

interface Props {
    onSubmit: (noteObj: SubmitNote) => void,
}

function Form({ onSubmit }: Props) {

    const [text, setText] = useState('');
    const [category, setCategory] = useState('null');

    const handleNoteText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleNoteCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }

    const handleSubmit = () => {
        let now = new Date();
        let dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} | ${now.getHours()}:${now.getMinutes()}`;

        if (text === '') {
            alert({text: 'Please write something in your note', type: 'notice', delay: 2500, styling: 'angeler', icons: 'angeler'})
            return
        } else if (category == 'null') {
            alert({ text: 'PLease select a category', type: 'notice', delay: 2000, styling: 'angeler', icons: 'angeler' })
            return
        }

        const id: string = uuid()
        
        const obj: SubmitNote = {
            text: text,
            category: category,
            archived: false,
            time: dateTime,
            id: id,
        }

        onSubmit(obj)

        setText('')
        setCategory('null')
    }

    return (
            <div className="card text-dark bg-light mb-3">
                <div className="card-body">
                    <h5 className="card-title">Write a note</h5>
                    <div className="form-group">
                        <textarea id="addNote" className="form-control" aria-label="With textarea" value={text} onChange={handleNoteText}></textarea> 
                        <p className="card-text mt-3 font-weight-bold">Select category</p>
                        <select className="form-select" id="selection" value={category} onChange={handleNoteCategory}>
                            <option value="null">Pick category</option>
                            <option value="task">Task</option>
                            <option value="idea">Idea</option>
                            <option value="random thought">Random thought</option>
                        </select>
                    </div>
                    <br />
                    <button id="addBtn" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                    <Switch />
                </div>
            </div>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onSubmit: (noteObj: SubmitNote) => dispatch(actions.addNote(noteObj))
    }
}

export default connect(null, mapDispatchToProps)(Form);