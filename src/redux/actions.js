import { createAction } from '@reduxjs/toolkit'


export const addNote = createAction('note/ADD')
export const removeNote = createAction('note/REMOVE')

export const edit = createAction('note/EDIT')

export const archive = createAction('note/ARCHIVE')
export const unarchive = createAction('note/UNARCHIVE')


export const changeTableData = createAction('table/CHANGE_TABLE_DATA')

