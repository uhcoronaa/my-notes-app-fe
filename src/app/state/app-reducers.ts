import { categoriesReducer } from "../modules/specific/categories/state/categories.reducer";
import { loaderReducer } from "../modules/specific/loader/loader.reducer";
import { notesReducer } from "../modules/specific/notes/state/notes.reducer";
import { sortNotesReducer } from "../modules/specific/sort-notes/state/sort-notes.reducer";
import { unsavedFormsReducers } from "../modules/specific/unsaved-forms/unsaved-forms.reducer";
import { userReducer } from "../modules/users/state/users.reducer";

export const AppReducer = {
    user: userReducer,
    loader: loaderReducer,
    ['sort-notes']: sortNotesReducer,
    ['unsaved-forms']: unsavedFormsReducers,
    notes: notesReducer,
    categories: categoriesReducer,
}