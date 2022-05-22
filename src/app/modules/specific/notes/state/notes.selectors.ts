import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotesState } from "./notes.state";

const notesState = createFeatureSelector<NotesState>('notes');

export const notesList = createSelector(notesState, (state) => {
    return state.notesList;
});

export const errors = createSelector(notesState, (state) => state.errors);