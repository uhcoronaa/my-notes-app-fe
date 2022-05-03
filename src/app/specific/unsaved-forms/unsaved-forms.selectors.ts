import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UnsavedFormState } from "./unsaved-forms.state";

const unsavedFormsState = createFeatureSelector<UnsavedFormState>('unsaved-forms');

export const unsavedForms = createSelector(unsavedFormsState, (state) => {
    return !state.unsavedForms.some((form) => form.originalValue !== form.actualValue);
});