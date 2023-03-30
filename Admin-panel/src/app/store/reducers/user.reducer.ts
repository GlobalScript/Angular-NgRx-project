import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/auth/models/authUser';
import { allUserSuccessAction, } from '../actions/user.action';


export interface IUserState {
    userList: User[];
}

export const initialState: IUserState = {
    userList: [],
};

export const userReducer = createReducer(
    initialState,
    on(allUserSuccessAction, (state, payload) => ({ ...state, userList: payload.users })),
);