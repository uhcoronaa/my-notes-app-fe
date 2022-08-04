import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { startLoading, stopLoading } from "./loader.actions";
import { LoaderState, initialState } from "./loader.state";

const startLoadingReducer = (state: LoaderState, action: any) => {
    const loadings = [...state.loadings, action.loadingName];
    return {
        ...state,
        loadings
    }
}

const stopLoadingReducer = (state: LoaderState, action: any) => {
    const loadings = [...state.loadings];
    const loadingIndex = loadings.findIndex((s) => s === action.loadingName);
    loadings.splice(loadingIndex, 1);
    return {
        ...state,
        loadings
    }
}

export const loaderReducer: ActionReducer<LoaderState, Action> = createReducer(
    initialState,
    on(startLoading, startLoadingReducer),
    on(stopLoading, stopLoadingReducer),
)