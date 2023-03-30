import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { Observable } from 'rxjs';
import { prodByIdSelector } from 'src/app/store/selectors/product.selectors';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent {

  constructor(private store: Store<IAppState>) { }

  prodData: Observable<Product | null> = this.store.select(prodByIdSelector);
}
