import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/create/models/product';
import { CreatedProduct } from 'src/app/create/models/created-product';


export const createProdAction = createAction(
  '[Create] Create Poduct',
  props<{ prod: CreatedProduct }>()
);

export const updateProdAction = createAction(
  '[Create] Update Poduct',
  props<{ prod: CreatedProduct, id: string }>()
);

export const deleteProdAction = createAction(
  '[Create] Remove Poduct',
  props<{ id: string }>()
);

export const allProdAction = createAction(
  '[Goods] Get Poducts'
);

export const allProdSuccessAction = createAction(
  '[Goods] Get Poducts Success',
  props<{ products: Product[] }>()
);

export const prodByIdAction = createAction(
  '[Prod] Get PodById',
  props<{ id: string }>()
);

export const prodByIdSuccessAction = createAction(
  '[Prod] Get Poduct Success',
  props<{ prodById: Product }>()
);

export const editByIdAction = createAction(
  '[Prod] Edit Poduct By Id',
  props<{ id: string }>()
);

export const prodByIdClearAction = createAction(
  '[Prod] Сlean the product'
);

