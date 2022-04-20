import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { Note } from "src/app/interfaces/note.interface";
import { addNote, deleteNote, loadNotes, updateNote } from "./notes.actions";
import { initialState, NotesState } from "./notes.state";


const loadNotesReducer = (state: NotesState, action: any) => {
    return {
        ...state,
        notesList: action.notes
    }
}

const deleteNoteReducer = (state: NotesState, action: any) => {
    const notes = [...state.notesList];
    const deletedIndex = notes.findIndex((category: Note) => category._id === action.id);
    notes.splice(deletedIndex, 1);
    return {
        ...state,
        categoriesList: notes
    }
}

const addNoteReducer = (state: NotesState, action: any) => {
    const notes = [...state.notesList];
    notes.push(action.note);
    return {
        ...state,
        notesList: notes
    }
}

const updateNoteReducer = (state: NotesState, action: any) => {
    const notes = [...state.notesList];
    const updateIndex = notes.findIndex((note: Note) => note._id === action.id);
    notes[updateIndex] = {
        ...notes[updateIndex],
        ...action.note
    }
    return {
        ...state,
        notesList: notes
    }
}

export const notesReducer: ActionReducer<NotesState, Action> = createReducer(
    initialState,
    on(loadNotes, loadNotesReducer),
    on(deleteNote, deleteNoteReducer),
    on(addNote, addNoteReducer),
    on(updateNote, updateNoteReducer)
)