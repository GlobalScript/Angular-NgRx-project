import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { loginAction } from 'src/app/store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form!: FormGroup;

  constructor(private store: Store<IAppState>, public authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "email": new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      'password': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]),
    });
  }

  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

  submit(): void {
    this.authService.preloaderAuth = true;
    this.store.dispatch(loginAction(this.form.value));
  }

}
