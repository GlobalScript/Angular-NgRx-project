import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/create/models/product';
import { allProdSuccessAction, prodByIdClearAction, prodByIdSuccessAction } from '../actions/product.action';

export interface IPoduct {
    prodList: Product[];
    prodById: Product | null;
}

export const initialState: IPoduct = {
    prodList: [],
    prodById: null,
};

export const productReducer = createReducer(
    initialState,
    on(allProdSuccessAction, (state, payload) => ({ ...state, prodList: payload.products })),
    on(prodByIdSuccessAction, (state, payload) => ({ ...state, prodById: payload.prodById })),
    on(prodByIdClearAction, (state) => ({ ...state, prodById: null })),
);