export interface formStatus {
    formId: string;
    originalValue: Object;
    actualValue: Object;
}

export interface UnsavedFormState {
    unsavedForms: formStatus[];
}

export const initialState: UnsavedFormState = {
    unsavedForms: []
}