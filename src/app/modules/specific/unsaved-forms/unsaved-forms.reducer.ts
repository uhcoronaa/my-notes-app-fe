import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { formInitialized, formValueChanged, unsavedFormsCleaned } from "./unsaved-forms.actions";
import { formStatus, initialState, UnsavedFormState } from "./unsaved-forms.state";

const formInitializedReducer = (state: UnsavedFormState, action: any) => {
    const newFormValue: formStatus = {
        formId: action.formId,
        originalValue: {...action.value},
        actualValue: {...action.value}
    }
    const forms = [...state.unsavedForms, newFormValue];
    return {
        ...state,
        unsavedForms: forms
    }
}

const formValueChangedReducer = (state: UnsavedFormState, action: any) => {
    const formIndex = state.unsavedForms.findIndex((form) => form.formId === action.formId);
    const newValue = {
        ...state.unsavedForms[formIndex],
        actualValue: action.value
    }
    const forms = [...state.unsavedForms];
    forms.splice(formIndex, 1, newValue);
    return {
        ...state,
        unsavedForms: forms
    }
}

const unsavedFormsCleanedReducer = (state: UnsavedFormState, action: any) => {
    return {
        ...state,
        unsavedForms: []
    }
}

export const unsavedFormsReducers: ActionReducer<UnsavedFormState, Action> = createReducer(
    initialState,
    on(formInitialized, formInitializedReducer),
    on(formValueChanged, formValueChangedReducer),
    on(unsavedFormsCleaned, unsavedFormsCleanedReducer),
)