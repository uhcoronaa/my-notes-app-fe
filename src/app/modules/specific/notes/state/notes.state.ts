import { IError } from "src/app/interfaces/error.interface";
import { Note } from "src/app/interfaces/note.interface";

export interface NotesState {
    notesList: Note[],
    errors: IError[],
}

export const initialState: NotesState = {
    notesList: [],
    errors: [],
}