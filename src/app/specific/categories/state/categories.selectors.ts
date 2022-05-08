import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoriesState } from "./categories.state";

const categoriesState = createFeatureSelector<CategoriesState>('categories');

export const categoriesList = createSelector(categoriesState, (state) => {
    return state.categoriesList;
})

export const errors = createSelector(categoriesState, (state) => state.errors);