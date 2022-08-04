import { Category } from "src/app/interfaces/categories.interface";
import { IError } from "src/app/interfaces/error.interface";

export interface CategoriesState {
    categoriesList: Category[],
    errors: IError[],
}

export const initialState: CategoriesState = {
    categoriesList: [],
    errors: [],
}