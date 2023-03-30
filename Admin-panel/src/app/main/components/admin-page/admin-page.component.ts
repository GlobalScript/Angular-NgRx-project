import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { authUserSelector } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  role!: string;

  constructor(private store: Store<IAppState>) {
    this.store.select(authUserSelector).pipe(take(2)).subscribe(user => {
      this.role = user?.role ? user?.role : '';
    })
  }

}
