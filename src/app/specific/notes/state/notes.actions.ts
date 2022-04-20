import { createAction, props } from "@ngrx/store";
import { Note } from "src/app/interfaces/note.interface";

export const loadNotes = createAction('Notes Loaded', props<{ notes: Note[] }>());
export const deleteNote = createAction('Note Deleted', props<{ id: string }>());
export const addNote = createAction('Note Added', props<{ category: Note }>());
export const updateNote = createAction('Note Updated', props<{ id: string , category: Partial<Note> }>());