import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { OrderData } from '../models/order-data';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { allProdSelector } from 'src/app/store/selectors/product.selectors';
import { Product } from 'src/app/create/models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  allProd: Observable<Product[]> = this.store.select(allProdSelector).pipe(take(2))

  constructor(private http: HttpClient, private store: Store<IAppState>) { }


  getOrderById(id: string): Observable<OrderData> {
    return this.http.get<OrderData>(environment.API_URL + `/api/get-cart/${id}`);

  }

  getAllOrder(): Observable<OrderData[]> {
    return this.http.get<OrderData[]>(environment.API_URL + '/api/all-cart');
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(environment.API_URL + `/api/delete-cart/${id}`);
  }

  orderTransform(data: OrderData): Order {
    const count: { [type: string]: number } = JSON.parse(data.cart).count;
    const order: Order = {
      firstname: data.first_name,
      lastname: data.last_name,
      phone: data.phone_number,
      cart: count,
      id: data.id
    }
    return order
  }

  private reindexingProducts(products: Product[]): { [type: string]: Product } {
    return products.reduce((acc, item: Product) => {
      acc[item.id] = item
      return acc
    }, Object.assign({}))
  }

  availableProdCart(products: Product[], order: Order): Product[] {
    return Object.keys(order.cart).reduce((acc, item) => {
      const prod: Product | undefined = (this.reindexingProducts(products)[item])
      if (prod) acc.push({ ...prod, count: order.cart[item] })
      return acc
    }, Array())
  }

  availableOrders(products: Product[], orders: Order[]): Order[] {
    return orders.reduce((acc, order) => {
      if (this.availableProdCart(products, order).length) acc.push(order)
      return acc
    }, Array())
  }

}
