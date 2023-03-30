import { createSelector } from '@ngrx/store';
import { Product } from 'src/app/create/models/product';
import { Order } from 'src/app/main/models/order';
import { IAppState } from '../reducers/app.reducer';
import { IOrder } from '../reducers/order.reducer';

const orderSlice = (state: IAppState): IOrder => state.order;

export const allOrderSelector = createSelector(
    orderSlice,
    (state: IOrder): Order[] => state.orderList
);

export const orderByIdSelector = createSelector(
    orderSlice,
    (state: IOrder): Order | null => state.orderById
);

export const orderDataSelector = createSelector(
    orderSlice,
    (state: IOrder): { prods: Product[], order: Order } | null => state.orderData
);