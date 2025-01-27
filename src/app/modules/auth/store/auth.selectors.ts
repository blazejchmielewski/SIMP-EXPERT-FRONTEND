import { createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { AppState } from "src/app/store/app.reducer";

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
    selectAuth,
    (state: AuthState) => state.user
)

export const selectAuthLoading = createSelector(
    selectAuth,
    (state: AuthState) => state.loading
)

export const selectAuthError = createSelector(
    selectAuth,
    (state: AuthState) => state.error
)