import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { orderDataSelector } from 'src/app/store/selectors/order.selectors';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/create/models/product';
import { Order } from '../../models/order';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  dataSub!: Subscription;
  data!: { prods: Product[], order: Order } | null

  constructor(
    private modal: NgbModal,
    private store: Store<IAppState>,
    private router: Router,
    public mainService: MainService
  ) { }

  ngOnInit(): void {
    this.dataSub = this.store.select(orderDataSelector).subscribe(data => this.data = data)
  }

  deleteProduct(id: string | undefined, title: string | undefined) {
    if (!id || !title) return;
    const modalRef = this.modal.open(DeleteWarningComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.data = { id, title, order: true };
    this.router.navigate(['/main/orders'])
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
