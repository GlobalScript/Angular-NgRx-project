import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { allUserSelector } from 'src/app/store/selectors/user.selectors';
import { allUserAction, updateRoleAction } from 'src/app/store/actions/user.action';
import { User } from 'src/app/auth/models/authUser';
import { Roles } from 'src/app/shared/enums/roles';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  users: Observable<User[]> = this.store.select(allUserSelector)
  roles = Roles;

  constructor(private store: Store<IAppState>,
    public modal: NgbModal,
    public mainService: MainService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(allUserAction())
  }

  updateRole(role: string, user: User) {
    this.mainService.spinner = user.id;
    const updateUser: User = { ...user, role };
    this.store.dispatch(updateRoleAction(updateRoleAction({ user: updateUser })));
  }

  deleteUser(id: string, firstname: string, lastname: string) {
    const title: string = `${firstname} ${lastname}`
    const modalRef = this.modal.open(DeleteWarningComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.data = { id, title, user: true };
  }

}
