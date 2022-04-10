import { configureStore, createReducer, PayloadAction } from '@reduxjs/toolkit'
import * as actions from './actions'

import { SubmitNote, State, Id, ModalData } from '../types'

const initialState = {
    notes: [
        {
            text: 'Lorem 06/01/2022 to 06/02/2022 ipsum',
            time: '2022-2-3 | 16:21',
            category: 'task',
            archived: false,
            id: 1,
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-3 | 12:33',
            category: 'idea',
            archived: false,
            id: 2,
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-2 | 11:33',
            category: 'random thought',
            archived: false,
            id: 3,
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-1 | 13:53',
            category: 'idea',
            archived: false,
            id: 4,
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-10 | 10:00',
            category: 'task',
            archived: true,
            id: 5,
        }
    ],
    tableData: [],
    modal: {
        text: '',
        category: '',
        isOpen: false, 
        id: '',
    },
    showArchived: false,
}

const reducer = createReducer(initialState, (builder) =>
    builder
        .addCase(
            actions.addNote, (state: State, action: PayloadAction<SubmitNote>) => {
                state.notes.push(action.payload)  
            }
    )
        .addCase(
            actions.removeNote, (state: State, action: PayloadAction<Id>) => {
                const newNotes = state.notes.filter((note: any) => note.id != action.payload)
                state.notes = newNotes
            }
    )
        .addCase(
            actions.closeModal, (state, action) => {
                const closedModal = {text: '', category: '', isOpen: false, id: ''}
                return {
                    ...state,
                    modal: closedModal,
                }
            }
    )
        .addCase(
            actions.openModal, (state, action) => {
                const newModal = {
                    text: state.notes.filter(note => note.id == action.payload)[0].text,
                    category: state.notes.filter(note => note.id == action.payload)[0].category,
                    isOpen: true,
                    id: action.payload
                }
                return {
                    ...state,
                    modal: newModal,
                }
            }
    )
        .addCase(
            actions.edit, (state, action) => {
                const newNotes = state.notes.map((note) => {
                    if (note.id == action.payload.id) {
                    return {...note, text: action.payload.text, category: action.payload.category};
                    }
                    return note
                })
                return {
                    ...state,
                    notes: newNotes,
                }
            }
    )
        .addCase(
            actions.archive, (state, action) => {
                const newNotes = state.notes.map((note) => {
                    if (note.id == action.payload) {
                    return {...note, archived: true};
                    }
                    return note
                })
                return {
                    ...state,
                    notes: newNotes,
                }
            }
    )
        .addCase(
            actions.unarchive, (state, action) => {
            const newNotes = state.notes.map((note) => {
                if (note.id == action.payload) {
                return {...note, archived: false};
                }
                return note
            })
            return {
                ...state,
                notes: newNotes,
            }
        }
    )
        .addCase(
            actions.toggleShowArchived, (state, action) => {
            return {
                ...state,
                showArchived: !state.showArchived
            }
        }
    )
        .addCase(
            actions.changeTableData, (state, action) => {
                return {
                    ...state,
                    tableData: action.payload
                }
        }
    )
)

const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV === "development",
})

export default store;

export type AppDispatch = typeof store.dispatch