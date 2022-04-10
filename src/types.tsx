import { type } from "os";

export type State = {
    notes: SubmitNote[],
    tableData: {[key: string]: {active: number, archived: number}}[],
    modal: ModalData,
    showArchived: boolean
}

export type ModalData = {
    text: string,
    category: string,
    isOpen: boolean, 
    id: Id,
}

export type Id = number | string;

export type SubmitNote = {
    text: string;
    category: string;
    archived: boolean;
    time: string;
    id: Id;
}

export type SubmitEdit = {
    text: string;
    category: string;
    id: Id;
}