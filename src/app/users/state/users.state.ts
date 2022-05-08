import { IError } from "src/app/interfaces/error.interface";
import { User } from "src/app/interfaces/user.interface";

export interface UserState {
    loggedUser: Partial<User> | null;
    accessToken: string | null;
    refreshToken: string | null;
    errors: IError[],
}

export const initialState: UserState = {
    loggedUser: null,
    accessToken: null,
    refreshToken: null,
    errors: [],
}