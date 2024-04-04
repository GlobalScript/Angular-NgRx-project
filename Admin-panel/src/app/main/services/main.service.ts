import { Injectable } from '@angular/core';
import { Product } from 'src/app/create/models/product';
import {Realtime} from 'ably';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private ablyClient!: any;
  private preloader: boolean = false;
  private preloaderId: string = '';
  selectProdId!: string;

  constructor() {
    this.ablyClient = new Realtime(environment.ABLY_API_KEY);
  }

  cartChannel(): Observable<any> {
    return this.ablyClient.channels.get("cart-updated");
  }

  userChannel(): Observable<any> {
    return this.ablyClient.channels.get("user-registration");
  }

  set preloaderRemoveProd(value: boolean) {
    this.preloader = value;
  }

  get preloaderRemoveProd(): boolean {
    return this.preloader;
  }

  set spinner(value: string) {
    this.preloaderId = value;
  }

  get spinner(): string {
    return this.preloaderId;
  }

  filterSearch(arr: Product[] | null, value: string, by: string): Product[] {
    if (!arr) return []
    if (!value) {
      if (!by) return arr;
      return arr.filter(prod => prod.category === by);
    };
    if (!by) {
      return arr.filter(
        prod => prod.title.toLowerCase().includes(value.toLowerCase())
      )
    }
    return arr.filter(prod => prod.category === by && prod.title.toLowerCase().includes(value.toLowerCase()))
  }
}
