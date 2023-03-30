import { createSelector } from '@ngrx/store';
import { User } from 'src/app/auth/models/authUser';
import { IAppState } from '../reducers/app.reducer';
import { IAuth } from '../reducers/auth.reducer';


const authUserSlice = (state: IAppState): IAuth => state.auth;

export const authUserSelector = createSelector(
    authUserSlice,
    (state: IAuth): User | null => state.authUser
);

export const isAuthSelector = createSelector(
    authUserSlice,
    (state: IAuth): boolean => state.isAuth
);


