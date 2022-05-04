import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./users.state";

const userState = createFeatureSelector<UserState>('user');

export const loggedUser = createSelector(userState, (state) => {
    return state.loggedUser;
});

export const accessToken = createSelector(userState, (state) => {
    return state.accessToken;
});

export const refreshToken = createSelector(userState, (state) => {
    return state.refreshToken;
});