export interface SortNotesState {
    todoNotes: number;
    inProgressNotes: number;
    doneNotes: number;
}

export const initialState: SortNotesState = {
    todoNotes: 0,
    inProgressNotes: 0,
    doneNotes: 0
}
