import { createSelector } from '@ngrx/store';
import { Product } from 'src/app/create/models/product';
import { IAppState } from '../reducers/app.reducer';
import { IPoduct } from '../reducers/product.reducer';

const prodSlice = (state: IAppState): IPoduct => state.prod;

export const allProdSelector = createSelector(
    prodSlice,
    (state: IPoduct): Product[] => state.prodList
);

export const prodByIdSelector = createSelector(
    prodSlice,
    (state: IPoduct): Product | null => state.prodById
);
