import { CategoriesState } from "../modules/specific/categories/state/categories.state";
import { LoaderState } from "../modules/specific/loader/loader.state";
import { NotesState } from "../modules/specific/notes/state/notes.state";
import { SortNotesState } from "../modules/specific/sort-notes/state/sort-notes.state";
import { UnsavedFormState } from "../modules/specific/unsaved-forms/unsaved-forms.state";
import { UserState } from "../modules/users/state/users.state";

export interface AppState {
    user: UserState;
    loader: LoaderState;
    ['sort-notes']: SortNotesState;
    ['unsaved-forms']: UnsavedFormState;
    notes: NotesState;
    categories: CategoriesState;
}