import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/models/authUser';

export const allUserAction = createAction(
  '[User] Get All Users'
);

export const allUserSuccessAction = createAction(
  '[User] Get All Users Success',
  props<{ users: User[] }>()
);

export const updateRoleAction = createAction(
  '[User] Update role',
  props<{ user: User }>()
);

export const removeUserAction = createAction(
  '[User] Remove User',
  props<{ id: string }>()
);

