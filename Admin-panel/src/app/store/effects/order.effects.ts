import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MainService } from 'src/app/main/services/main.service';
import { OrderService } from 'src/app/main/services/order.service';
import { allOrderAction, allOrderSuccessAction, orderByIdAction, orderByIdSuccessAction, deleteOrderAction } from '../actions/order.actions';


@Injectable()
export class OrderEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private orderService: OrderService,
        private mainService: MainService
    ) { }


    allOrderEffect = createEffect(() =>
        this.actions.pipe(
            ofType(allOrderAction),
            exhaustMap(() =>
                this.orderService.getAllOrder().pipe(
                    map(response => {
                        this.mainService.preloaderRemoveProd = false;
                        return allOrderSuccessAction({
                            orders: response.map(data => this.orderService.orderTransform(data))
                        })
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )))
    )


    orderByIdeffect = createEffect(() =>
        this.actions.pipe(
            ofType(orderByIdAction),
            exhaustMap((payload) =>
                this.orderService.getOrderById(payload.id).pipe(
                    map(response => {
                        this.mainService.spinner = '';
                        return orderByIdSuccessAction({ orderById: this.orderService.orderTransform(response) })
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )))
    )

    deleteOrderEffect = createEffect(() =>
        this.actions.pipe(
            ofType(deleteOrderAction),
            exhaustMap((payload) =>
                this.orderService.deleteOrder(payload.id).pipe(
                    map(() => {
                        return allOrderAction();
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                ))))
}