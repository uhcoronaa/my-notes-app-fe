import { createAction, props } from "@ngrx/store";

export const startLoading = createAction('Loading Started', props<{ loadingName: string }>());
export const stopLoading = createAction('Loading Stopped', props<{ loadingName: string }>());