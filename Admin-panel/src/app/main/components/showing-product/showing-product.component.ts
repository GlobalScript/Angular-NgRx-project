import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { allProdAction, prodByIdClearAction, prodByIdAction } from 'src/app/store/actions/product.action';
import { allProdSelector, prodByIdSelector } from 'src/app/store/selectors/product.selectors';
import { Product } from 'src/app/create/models/product';
import { ProductCategories } from 'src/app/shared/enums/product-categories';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-showing-product',
  templateUrl: './showing-product.component.html',
  styleUrls: ['./showing-product.component.scss']
})
export class ShowingProductComponent implements OnInit, OnDestroy {

  allProdSub!: Subscription;
  prodByIdSub!: Subscription;
  allProd: Observable<Product[]> = this.store.select(allProdSelector)
  prodById: Observable<Product | null> = this.store.select(prodByIdSelector).pipe(take(2));
  currentProds!: Product[];
  prodLength!: number;
  prodsData!: Product[];
  pageSize = 3;
  page = 1;
  inputSearch: string = '';
  selectValue: string = '';
  categories = ProductCategories;

  constructor(
    private store: Store<IAppState>,
    public modal: NgbModal,
    public mainService: MainService
  ) { }

  ngOnInit(): void {
    this.allProdSub = this.allProd.subscribe(list => {
      if (!list.length) this.store.dispatch(allProdAction())
      this.currentProds = list
      this.prodsData = list
      this.prodLength = list.length
    })
  }

  prodSearch() {
    this.currentProds = this.mainService.filterSearch(this.prodsData, this.inputSearch, this.selectValue)
    this.prodLength = this.currentProds.length
  }

  clearSearch() {
    this.inputSearch = '';
    this.selectValue = '';
    this.currentProds = this.prodsData;
    this.prodLength = this.currentProds.length;
  }

  selectCategory() {
    this.currentProds = this.mainService.filterSearch(this.prodsData, this.inputSearch, this.selectValue)
    this.prodLength = this.currentProds.length;
  }

  openDetailModal(id: string): void {
    if (this.mainService.preloaderRemoveProd) return;
    this.mainService.spinner = id;
    this.store.dispatch(prodByIdClearAction())
    this.store.dispatch(prodByIdAction({ id }))
    this.prodByIdSub = this.prodById.subscribe(prod => {
      if (prod) {
        const modalRef = this.modal.open(ProductDetailComponent);
        modalRef.componentInstance.prod = prod;
      }
    })
  }

  onPageChange(page: number): void {
    if (page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.allProdSub.unsubscribe();
    if (this.prodByIdSub) this.prodByIdSub.unsubscribe()
  }
}
