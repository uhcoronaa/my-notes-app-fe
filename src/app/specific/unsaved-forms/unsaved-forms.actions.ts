import { createAction, props } from "@ngrx/store";

export const formInitialized = createAction('Form Value Initialized', props<{ formId: string, value: Object }>());
export const formValueChanged = createAction('Form Value Updated', props<{ formId: string, value: Object }>());
export const unsavedFormsCleaned = createAction('Unsaved Forms Cleaned');