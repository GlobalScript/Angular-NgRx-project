import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CreatedProduct } from '../models/created-product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductPreviewComponent } from '../components/product-preview/product-preview.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  createProduct(prod: CreatedProduct): Observable<Product> {
    return this.http.post<Product>(environment.API_URL + '/api/create-product', prod);
  }

  updateProduct(id: string, prod: CreatedProduct): Observable<Product> {
    return this.http.put<Product>(environment.API_URL + `/api/update-product/${id}`, prod);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(environment.API_URL + `/api/delete-product/${id}`);
  }

  getPodById(id: string): Observable<Product> {
    return this.http.get<Product>(environment.API_URL + `/api/product/${id}`);

  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.API_URL + '/api/all-products');
  }

  openPreview(prod: Product): void {
    const modalRef = this.modalService.open(ProductPreviewComponent);
    modalRef.componentInstance.prod = prod;
  }
}
