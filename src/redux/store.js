import { configureStore, createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

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
}

const reducer = createReducer(initialState, {
    [actions.addNote]: (state, action) => {
        return {
            ...state,
            notes: [...state.notes, action.payload],
        };
    },
    [actions.removeNote]: (state, action) => {
        const newNotes = state.notes.filter(note => note.id != action.payload)
        return {
            ...state,
            notes: newNotes,
        }
    },
    // [actions.edit]: (state, action) => {
    //     return {
    //         ...state,
    //         notes: newNotes,
    //     }
    // },
    // [actions.archive]: (state, action) => {
    //     return {
    //         ...state,
    //         notes: newNotes,
    //     }
    // },
    // [actions.unarchive]: (state, action) => {
    //     return {
    //         ...state,
    //         contacts: newContacts
    //     }
    // },
    [actions.changeTableData]: (state, action) => {
        return {
            ...state,
            tableData: action.payload
        }
    }
})

const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV === "development",
})

export default store;