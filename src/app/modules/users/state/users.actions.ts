import { createAction, props } from "@ngrx/store";
import { IError } from "src/app/interfaces/error.interface";
import { User } from "src/app/interfaces/user.interface";

export const loggedUserUpdated = createAction('LogedUserUpdated', props<{ loggedUser: Partial<User> | null }>());
export const accessTokenUpdated = createAction('AccessTokenUpdated', props<{ accessToken: string | null }>());
export const refreshTokenUpdated = createAction('RefreshTokenUpdated', props<{ refreshToken: string | null }>());
export const saveApiError = createAction('User Error Ocurred', props<{ error: IError }>());
export const resetApiErrors = createAction('User Error Reset');
export const userImageUpdated = createAction('User Image Updated', props<{ image: string | null }>());