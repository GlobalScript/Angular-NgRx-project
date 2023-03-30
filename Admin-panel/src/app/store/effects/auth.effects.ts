import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/auth/services/token.service';
import {
    loginAction,
    loginSuccessAction,
    loginFailureAction,
    signUpAction,
    logOutAction,
    currentAuthAction,
} from '../actions/auth.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/authUser';
import { environment } from 'src/environments/environment';
import { Roles } from 'src/app/shared/enums/roles';


@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private tokenService: TokenService,
        private router: Router,
    ) { }

    loginEffect = createEffect(() =>
        this.actions.pipe(
            ofType(loginAction),
            exhaustMap((payload) =>
                this.authService.login(payload).pipe(
                    map(response => {
                        this.authService.preloaderAuth = false;
                        const user: User = this.tokenService.parseJwt(response.token);
                        if (user.role === Roles.user) {
                            this.authService.openErrorMessage(environment.ROLE_MESSAGE)
                            return loginFailureAction()
                        }
                        this.tokenService.setToken(response.token);
                        this.router.navigate(['main'])
                        return loginSuccessAction({ token: response.token, user })
                    }),
                    catchError((err) => {
                        this.authService.preloaderAuth = false;
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )))
    )


    signUpffect = createEffect(() =>
        this.actions.pipe(
            ofType(signUpAction),
            exhaustMap(payload => {
                return this.authService.signUp(payload.submitUser).pipe(
                    tap((response) => {
                        this.authService.preloaderAuth = false;
                        this.authService.openErrorMessage(response.message)
                        this.router.navigate(['/'])
                    }),
                    catchError((err) => {
                        this.authService.preloaderAuth = false;
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )
            })
        ), { dispatch: false })


    logOutEffect = createEffect(() =>
        this.actions.pipe(
            ofType(logOutAction),
            tap(() => {
                this.tokenService.removeToken();
                this.router.navigate(['/'])
            })
        ), { dispatch: false })


    currentAuthEffect = createEffect(() =>
        this.actions.pipe(
            ofType(currentAuthAction),
            map(() => {
                const token: string | null = this.tokenService.getStorageToken();
                if (!token) {
                    this.router.navigate(['/'])
                    return loginFailureAction()
                }
                const user: User = this.tokenService.parseJwt(token);
                this.router.navigate(['main'])
                return loginSuccessAction({ token, user })
            })
        )
    )

}