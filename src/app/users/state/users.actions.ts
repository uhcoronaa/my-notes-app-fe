import { createAction, props } from "@ngrx/store";
import { User } from "src/app/interfaces/user.interface";

export const loggedUserUpdated = createAction('LogedUserUpdated', props<{ loggedUser: Partial<User> | null }>());
export const accessTokenUpdated = createAction('AccessTokenUpdated', props<{ accessToken: string | null }>());
export const refreshTokenUpdated = createAction('RefreshTokenUpdated', props<{ refreshToken: string | null }>());