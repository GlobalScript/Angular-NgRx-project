import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { signUpAction } from 'src/app/store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  form!: FormGroup;

  constructor(private store: Store<IAppState>, public authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "firstname": new FormControl('',
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      'lastname': new FormControl('',
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      'email': new FormControl('',
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

  get name() { return this.form.get('firstname') }
  get surname() { return this.form.get('lastname') }
  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

  submit() {
    this.authService.preloaderAuth = true;
    this.store.dispatch(signUpAction({ submitUser: this.form.value }));
  }
}
