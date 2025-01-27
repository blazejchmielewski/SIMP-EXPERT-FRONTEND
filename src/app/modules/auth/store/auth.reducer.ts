import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.actions'
import { User } from "../../core/models/auth.model";


export interface AuthState{
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

const _authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, action) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, action) => ({
        ...state,
        loading: false, // Poprawienie, aby nie pozostawiać aplikacji w stanie ładowania
        user: action.user, // `user` to teraz już gotowy obiekt klasy `User`
        error: null,
    })),    
    on(AuthActions.loginFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message.email,
    })),
    on(AuthActions.autoLogin, (state, action) => ({
        ...state,
    })),
    on(AuthActions.autoLoginSuccess, (state, action) => ({
        ...state,
        user: new User(
            action.user.email,
            action.user.role,
            action.user.token
        ),
    })),
    on(AuthActions.autoLoginFailure, (state, action) => ({
        ...state,
    })),
    on(AuthActions.logout, (state, action) => ({
        ...state,
    })),
    on(AuthActions.logoutSuccess, (state, action) => ({
        ...state,
        user: null,
        error: null,
    })),
    on(AuthActions.logoutFailure, (state, action) => ({
        ...state,
    })),
    on(AuthActions.register, (state, action) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AuthActions.registerSuccess, (state, action) => ({
        ...state,
        loading: false,
        error: null
    })),
    on(AuthActions.registerFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error,
    })),
    on(AuthActions.addUser, (state, action) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AuthActions.addUserSuccess, (state, action) => ({
        ...state,
        loading: false,
        error: null
    })),
    on(AuthActions.addUserFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error,
    })),
    on(AuthActions.clearError, (state, action) => ({
        ...state,
        error: null,
    })),
);

export function authReducer(state: AuthState | undefined, action: Action){
    return _authReducer(state, action);
}
