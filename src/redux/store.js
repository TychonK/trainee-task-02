import { configureStore, createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = {
    notes: [
        {
            text: 'Lorem ipsum',
            time: '2022-2-3 | 16:21',
            category: 'task',
            archived: false
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-3 | 12:33',
            category: 'idea',
            archived: false
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-2 | 11:33',
            category: 'random thought',
            archived: false
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-1 | 13:53',
            category: 'idea',
            dates: '2022-02-05 | 12:00',
            archived: false
        },
        {
            text: 'Lorem ipsum',
            time: '2022-2-10 | 10:00',
            category: 'task',
            dates: '2022-12-20 | 14:15',
            archived: true
        }
    ],
    tableData: [],
}

const reducer = createReducer(initialState, {
    [actions.add]: (state, action) => {
        return {
            ...state,
            notes: [...state.notes, ...action.payload],
        };
    },
    [actions.removeNote]: (state, action) => {
        const newNotes = state.notes.filter(note => note.time !== state.notes[action.payload].time)
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