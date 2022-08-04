import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoaderState } from "./loader.state";

const loaderState = createFeatureSelector<LoaderState>('loader');

export const loadings = createSelector(loaderState, (state) => {
    return state.loadings.length;
});