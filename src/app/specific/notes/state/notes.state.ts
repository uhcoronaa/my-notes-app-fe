import { Note } from "src/app/interfaces/note.interface";

export interface NotesState {
    notesList: Note[]
}

export const initialState: NotesState = {
    notesList: []
}