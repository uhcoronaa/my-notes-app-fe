import { Category } from "src/app/interfaces/categories.interface";

export interface CategoriesState {
    categoriesList: Category[],
}

export const initialState: CategoriesState = {
    categoriesList: [],
}