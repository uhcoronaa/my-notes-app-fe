import { createAction, props } from "@ngrx/store";

export const updateTodoNotes = createAction('To Do Notes Updated', props<{ todoNotes: number }>());
export const updateInProgressNotes = createAction('In Progress Notes Updated', props<{ inProgressNotes: number }>());
export const updateDoneNotes = createAction('Done Notes Updated', props<{ doneNotes: number }>());