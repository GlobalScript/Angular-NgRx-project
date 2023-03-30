import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/create/models/product';
import { Order } from 'src/app/main/models/order';
import { allOrderSuccessAction, orderByIdClearAction, orderByIdSuccessAction, orderDataAction } from '../actions/order.actions';

export interface IOrder {
    orderList: Order[];
    orderById: Order | null;
    orderData: { prods: Product[], order: Order } | null;
}

export const initialState: IOrder = {
    orderList: [],
    orderById: null,
    orderData: null
};

export const orderReducer = createReducer(
    initialState,
    on(allOrderSuccessAction, (state, payload) => ({ ...state, orderList: payload.orders })),
    on(orderByIdSuccessAction, (state, payload) => ({ ...state, orderById: payload.orderById })),
    on(orderByIdClearAction, (state) => ({ ...state, orderById: null })),
    on(orderDataAction, (state, payload) => ({ ...state, orderData: payload })),
);