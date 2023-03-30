import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, throwError, catchError, exhaustMap } from 'rxjs';
import { UserService } from 'src/app/main/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MainService } from 'src/app/main/services/main.service';
import { allUserAction, allUserSuccessAction, removeUserAction, updateRoleAction } from '../actions/user.action';


@Injectable()
export class UserEffects {

    constructor(
        private userService: UserService,
        private actions: Actions,
        private authService: AuthService,
        private mainService: MainService
    ) { }

    allUserEffect = createEffect(() =>
        this.actions.pipe(
            ofType(allUserAction),
            exhaustMap(() =>
                this.userService.getUsers().pipe(
                    map(response => {
                        this.mainService.preloaderRemoveProd = false;
                        return allUserSuccessAction({ users: response })
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )))
    )


    updateRoleEffect = createEffect(() =>
        this.actions.pipe(
            ofType(updateRoleAction),
            exhaustMap((payload) =>
                this.userService.updateRole(payload.user).pipe(
                    map(() => {
                        this.mainService.spinner = '';
                        return allUserAction();
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                ))))


    removeUserEffect = createEffect(() =>
        this.actions.pipe(
            ofType(removeUserAction),
            exhaustMap((payload) =>
                this.userService.removeUser(payload.id).pipe(
                    map(() => {
                        return allUserAction();
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                ))))

}