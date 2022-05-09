import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { accessTokenUpdated, loggedUserUpdated, refreshTokenUpdated, resetApiErrors, saveApiError, userImageUpdated } from "./users.actions";
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

const saveApiErrorReducer = (state: UserState, action: any) => {
    return {
        ...state,
        errors: [...state.errors, action.error],
    }
}

const resetErrorsReducer = (state: UserState, action: any) => {
    return {
        ...state,
        errors: [],
    }
}

const userImageUpdatedReducer = (state: UserState, action: any) => {
    return {
        ...state,
        loggedUser: {
            ...state.loggedUser,
            image: action.image
        }
    }
}

export const userReducer: ActionReducer<UserState, Action> = createReducer(
    initialState,
    on(loggedUserUpdated, loggedUserUpdatedReducer),
    on(accessTokenUpdated, accessTokenUpdatedReducer),
    on(refreshTokenUpdated, refreshAccessTokenUpdatedReducer),
    on(saveApiError, saveApiErrorReducer),
    on(resetApiErrors, resetErrorsReducer),
    on(userImageUpdated, userImageUpdatedReducer)
)