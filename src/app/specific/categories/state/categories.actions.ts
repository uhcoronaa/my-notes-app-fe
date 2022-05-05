import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/interfaces/categories.interface";
import { IError } from "src/app/interfaces/error.interface";

export const loadCategories = createAction('Categories Loaded', props<{ categories: Category[] }>());
export const deleteCategory = createAction('Category Deleted', props<{ id: string }>());
export const addCategory = createAction('Category Added', props<{ category: Category }>());
export const updateCategory = createAction('Category Updated', props<{ id: string, category: Partial<Category> }>());
export const saveApiError = createAction('Category Error Ocurred', props<{ error: IError }>());