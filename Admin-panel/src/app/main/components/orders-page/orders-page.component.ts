import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/create/models/product';
import { allOrderAction, orderByIdAction, orderByIdClearAction, orderDataAction } from 'src/app/store/actions/order.actions';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { allOrderSelector, orderByIdSelector } from 'src/app/store/selectors/order.selectors';
import { allProdSelector } from 'src/app/store/selectors/product.selectors';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  inputSearch: string = '';
  prodsSub!: Subscription;
  ordersSub!: Subscription;
  orderByIdSub!: Subscription;
  prods: Observable<Product[]> = this.store.select(allProdSelector);
  orders: Observable<Order[]> = this.store.select(allOrderSelector);
  orderById: Observable<Order | null> = this.store.select(orderByIdSelector);
  availableOrders!: Order[];

  constructor(
    private store: Store<IAppState>,
    private orderService: OrderService,
    private router: Router,
    public mainService: MainService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(allOrderAction());
    this.ordersSub = this.orders.subscribe(data => {
      this.prodsSub = this.prods.subscribe(prods => {
        this.availableOrders = this.orderService.availableOrders(prods, data)
      })
    })
  }

  openDetailOrder(id: string): void {
    this.mainService.spinner = id;
    this.store.dispatch(orderByIdClearAction());
    this.store.dispatch(orderByIdAction({ id }));
    this.orderByIdSub = this.orderById.subscribe(order => {
      if (order) {
        this.prodsSub = this.prods.subscribe(prods => {
          const cartProd: Product[] = this.orderService.availableProdCart(prods, order);
          this.store.dispatch(orderDataAction({ prods: cartProd, order: order }));
          this.router.navigate(['/main/order-detail'])
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
    if (this.prodsSub) this.prodsSub.unsubscribe();
    if (this.orderByIdSub) this.orderByIdSub.unsubscribe();
  }

}
