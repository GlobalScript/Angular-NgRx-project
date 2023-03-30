import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, take } from 'rxjs';
import { MainService } from '../../services/main.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { allProdSelector, prodByIdSelector } from 'src/app/store/selectors/product.selectors';
import { prodByIdAction, prodByIdClearAction, editByIdAction } from 'src/app/store/actions/product.action';
import { Product } from 'src/app/create/models/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnDestroy {

  prodByIdSub!: Subscription;
  inputSearch: string = '';
  allProd: Observable<Product[]> = this.store.select(allProdSelector)
  prodById: Observable<Product | null> = this.store.select(prodByIdSelector).pipe(take(2))

  constructor(private store: Store<IAppState>,
    public modal: NgbModal,
    public mainService: MainService
  ) { }

  openDetailModal(id: string): void {
    this.mainService.spinner = id;
    if (this.mainService.preloaderRemoveProd) return;
    this.store.dispatch(prodByIdClearAction())
    this.store.dispatch(prodByIdAction({ id }))
    this.prodById.subscribe(prod => {
      if (prod) {
        const modalRef = this.modal.open(ProductDetailComponent);
        modalRef.componentInstance.prod = prod;
      }
    })
  }

  deleteProduct(id: string, title: string) {
    this.mainService.selectProdId = id;
    const modalRef = this.modal.open(DeleteWarningComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.data = { id, title, prod: true };
  }

  editProduct(id: string) {
    this.mainService.spinner = id;
    this.store.dispatch(editByIdAction({ id }))
  }

  ngOnDestroy(): void {
    if (this.prodByIdSub) this.prodByIdSub.unsubscribe();
  }

}
