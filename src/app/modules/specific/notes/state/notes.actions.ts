import { createAction, props } from "@ngrx/store";
import { IError } from "src/app/interfaces/error.interface";
import { Note } from "src/app/interfaces/note.interface";

export const loadNotes = createAction('Notes Loaded', props<{ notes: Note[] }>());
export const deleteNote = createAction('Note Deleted', props<{ id: string }>());
export const addNote = createAction('Note Added', props<{ note: Note }>());
export const updateNote = createAction('Note Updated', props<{ id: string , note: Partial<Note> }>());
export const saveApiError = createAction('Note Error Ocurred', props<{ error: IError }>());
export const resetApiErrors = createAction('Note Error Reset');