import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { updateDoneNotes, updateInProgressNotes, updateTodoNotes } from "./sort-notes.actions";
import { initialState, SortNotesState } from "./sort-notes.state";

const updateTodoNotesReducer = (state: SortNotesState, action: any) => {
    return {
        ...state,
        todoNotes: action.todoNotes
    }
}

const updateInProgressNotesReducer = (state: SortNotesState, action: any) => {
    return {
        ...state,
        inProgressNotes: action.inProgressNotes
    }
}

const updateDoneNotesReducer = (state: SortNotesState, action: any) => {
    return {
        ...state,
        doneNotes: action.doneNotes
    }
}

export const sortNotesReducer: ActionReducer<SortNotesState, Action> = createReducer(
    initialState,
    on(updateTodoNotes, updateTodoNotesReducer),
    on(updateInProgressNotes, updateInProgressNotesReducer),
    on(updateDoneNotes, updateDoneNotesReducer),
)