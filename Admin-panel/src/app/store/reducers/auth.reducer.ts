import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/auth/models/authUser';
import {
    loginSuccessAction,
    loginFailureAction,
    logOutAction
} from '../actions/auth.actions';

export interface IAuth {
    token: string;
    authUser: User | null;
    isAuth: boolean;
}

export const initialState: IAuth = {
    token: '',
    isAuth: false,
    authUser: null
};

export const authReducer = createReducer(
    initialState,
    on(loginSuccessAction, (state, payload) => ({ ...state, token: payload.token, authUser: payload.user, isAuth: true })),
    on(loginFailureAction, (state, payload) => ({ ...state, token: '', authUser: null, isAuth: false })),
    on(logOutAction, (state) => ({ ...state, token: '', authUser: null, isAuth: false })),
);