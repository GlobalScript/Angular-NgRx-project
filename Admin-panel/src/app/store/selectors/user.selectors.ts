import { createSelector } from '@ngrx/store';
import { User } from 'src/app/auth/models/authUser';
import { IAppState } from '../reducers/app.reducer';
import { IUserState } from '../reducers/user.reducer';

const userSlice = (state: IAppState): IUserState => state.user;

export const allUserSelector = createSelector(
    userSlice,
    (state: IUserState): User[] => state.userList
);

