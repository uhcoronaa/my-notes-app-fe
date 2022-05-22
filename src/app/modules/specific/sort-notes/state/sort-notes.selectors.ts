import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SortNotesState } from "./sort-notes.state";

const sortNotesState = createFeatureSelector<SortNotesState>('sort-notes');

export const todoNotes = createSelector(sortNotesState, (state) => {
    return state.todoNotes;
});

export const inProgressNotes = createSelector(sortNotesState, (state) => {
    return state.inProgressNotes;
});

export const doneNotes = createSelector(sortNotesState, (state) => {
    return state.doneNotes;
});
