import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { Category } from "src/app/interfaces/categories.interface";
import { addCategory, deleteCategory, loadCategories, saveApiError, updateCategory } from "./categories.actions";
import { CategoriesState, initialState } from "./categories.state";

const loadCategoriesReducer = (state: CategoriesState, action: any) => {
    return {
        ...state,
        categoriesList: action.categories
    }
}

const deleteCategoryReducer = (state: CategoriesState, action: any) => {
    const categories = [...state.categoriesList];
    const deletedIndex = categories.findIndex((category: Category) => category._id === action.id);
    categories.splice(deletedIndex, 1);
    return {
        ...state,
        categoriesList: categories
    }
}

const addCategoryReducer = (state: CategoriesState, action: any) => {
    const categories = [...state.categoriesList];
    categories.push(action.category);
    return {
        ...state,
        categoriesList: categories
    }
}

const updateCategoryReducer = (state: CategoriesState, action: any) => {
    const categories = [...state.categoriesList];
    const updateIndex = categories.findIndex((category: Category) => category._id === action.id);
    categories[updateIndex] = {
        ...categories[updateIndex],
        ...action.category
    }
    return {
        ...state,
        categoriesList: categories
    }
}

const saveApiErrorReducer = (state: CategoriesState, action: any) => {
    return {
        ...state,
        errors: [...state.errors, action.error],
    }
}

export const categoriesReducer: ActionReducer<CategoriesState, Action> = createReducer(
    initialState,
    on(loadCategories, loadCategoriesReducer),
    on(deleteCategory, deleteCategoryReducer),
    on(addCategory, addCategoryReducer),
    on(updateCategory, updateCategoryReducer),
    on(saveApiError, saveApiErrorReducer),
);
