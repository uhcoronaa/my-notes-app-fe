import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { accessTokenUpdated, loggedUserUpdated, refreshTokenUpdated } from "./users.actions";
import { initialState, UserState } from "./users.state";

const loggedUserUpdatedReducer = (state: UserState, action: any) => {
    return {
        ...state,
        loggedUser: action.loggedUser
    }
}

const accessTokenUpdatedReducer = (state: UserState, action: any) => {
    return {
        ...state,
        accessToken: action.accessToken
    }
}

const refreshAccessTokenUpdatedReducer = (state: UserState, action: any) => {
    return {
        ...state,
        refreshToken: action.refreshToken
    }
}

export const userReducer: ActionReducer<UserState, Action> = createReducer(
    initialState,
    on(loggedUserUpdated, loggedUserUpdatedReducer),
    on(accessTokenUpdated, accessTokenUpdatedReducer),
    on(refreshTokenUpdated, refreshAccessTokenUpdatedReducer),
)