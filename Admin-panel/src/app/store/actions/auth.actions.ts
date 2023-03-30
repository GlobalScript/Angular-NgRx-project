import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/models/authUser';
import { SubmitUser } from 'src/app/auth/models/submitUser';


export const loginAction = createAction(
  '[Auth] Login',
  props<{ email: string, password: string }>()
);

export const loginSuccessAction = createAction(
  '[Auth] Login Success',
  props<{ token: string, user: User }>()
);

export const loginFailureAction = createAction(
  '[Auth] Login Failure'
);

export const signUpAction = createAction(
  '[Auth] Signup',
  props<{ submitUser: SubmitUser }>()
);

export const logOutAction = createAction(
  '[Auth] Logout'
);

export const currentAuthAction = createAction(
  '[Auth] Current Authorization'
);


