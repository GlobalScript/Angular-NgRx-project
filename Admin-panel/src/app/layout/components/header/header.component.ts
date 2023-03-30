import { Component, OnInit } from '@angular/core';
import { Observable, map, first } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { authUserSelector } from 'src/app/store/selectors/auth.selectors';
import { currentAuthAction, logOutAction } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authUser: Observable<string | null> = this.store.select(authUserSelector).pipe(first(), map(user => `${user?.firstname} ${user?.lastname}`));


  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(currentAuthAction())
  }

  logOut(): void {
    this.store.dispatch(logOutAction());
  }

}
