import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from '../../services/main.service';
import { Product } from 'src/app/create/models/product';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { editByIdAction } from 'src/app/store/actions/product.action';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  @Input() prod!: Product;

  constructor(
    public modalActive: NgbActiveModal,
    private modal: NgbModal,
    private mainService: MainService,
    private store: Store<IAppState>
  ) { }

  deleteProduct(id: string, title: string) {
    this.mainService.selectProdId = this.prod.id
    const modalRef = this.modal.open(DeleteWarningComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.data = { id, title, prod: true };
    this.modalActive.dismiss('Cross click')
  }

  updateProduct(id: string) {
    this.store.dispatch(editByIdAction({ id }))
    this.modalActive.dismiss('Cross click')
  }
}
