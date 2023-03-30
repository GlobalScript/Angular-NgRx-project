import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/main/models/order';
import { Product } from 'src/app/create/models/product';


export const allOrderAction = createAction(
  '[Order] Get Orders'
);

export const allOrderSuccessAction = createAction(
  '[Order] Get Orderss Success',
  props<{ orders: Order[] }>()
);

export const orderByIdAction = createAction(
  '[Order] Get OrderById',
  props<{ id: string }>()
);

export const orderByIdSuccessAction = createAction(
  '[Order] Get Order Success',
  props<{ orderById: Order }>()
);

export const deleteOrderAction = createAction(
  '[Order] Remove Order',
  props<{ id: string }>()
);

export const orderByIdClearAction = createAction(
  '[Order] Сlean the order'
);

export const orderDataAction = createAction(
  '[Order] Order Data',
  props<{ prods: Product[], order: Order }>()
);