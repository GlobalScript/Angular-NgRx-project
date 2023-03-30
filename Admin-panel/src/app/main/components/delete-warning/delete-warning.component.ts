import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { deleteProdAction } from 'src/app/store/actions/product.action';
import { MainService } from '../../services/main.service';
import { removeUserAction } from 'src/app/store/actions/user.action';
import { deleteOrderAction } from 'src/app/store/actions/order.actions';


@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.scss']
})
export class DeleteWarningComponent {

  @Input() data!: { id: string, title: string, user: boolean, order: boolean, prod: boolean };

  constructor(
    public modal: NgbActiveModal,
    private store: Store<IAppState>,
    private mainService: MainService
  ) { }

  deleteProduct(id: string) {
    this.mainService.spinner = id;
    this.mainService.preloaderRemoveProd = true;
    if (this.data.user) this.store.dispatch(removeUserAction({ id }))
    if (this.data.prod) this.store.dispatch(deleteProdAction({ id }))
    if (this.data.order) this.store.dispatch(deleteOrderAction({ id }))
    this.modal.dismiss('Cross click')
  }

  closeWarning() {
    this.mainService.preloaderRemoveProd = false;
    this.mainService.selectProdId = '';
    this.modal.close('Cross click')
  }

}
