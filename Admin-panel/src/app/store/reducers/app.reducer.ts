import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { IAuth } from './auth.reducer';
import { IOrder, orderReducer } from './order.reducer';
import { IPoduct, productReducer } from './product.reducer';
import { IUserState, userReducer } from './user.reducer';

export interface IAppState {
   auth: IAuth,
   prod: IPoduct,
   user: IUserState,
   order: IOrder
}

export const appReducer: ActionReducerMap<IAppState> = {
   auth: authReducer,
   prod: productReducer,
   user: userReducer,
   order: orderReducer,
};