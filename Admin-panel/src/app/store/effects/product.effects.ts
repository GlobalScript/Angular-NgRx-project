import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, throwError } from 'rxjs';
import { ProductService } from 'src/app/create/services/product.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MainService } from 'src/app/main/services/main.service';
import {
    allProdSuccessAction,
    allProdAction, prodByIdAction,
    prodByIdSuccessAction,
    createProdAction,
    editByIdAction,
    updateProdAction,
    deleteProdAction
} from '../actions/product.action';

@Injectable()
export class ProdEffects {

    constructor(
        private actions: Actions,
        private prodService: ProductService,
        private authService: AuthService,
        private mainService: MainService,
        private router: Router,
        private location: Location
    ) { }

    createProdEffect = createEffect(() =>
        this.actions.pipe(
            ofType(createProdAction),
            exhaustMap((payload) =>
                this.prodService.createProduct(payload.prod).pipe(
                    map(response => {
                        this.prodService.openPreview(response)
                        return allProdAction();
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                ))))

    editByIdeffect = createEffect(() =>
        this.actions.pipe(
            ofType(editByIdAction),
            exhaustMap((payload) =>
                this.prodService.getPodById(payload.id).pipe(
                    map(response => {
                        this.mainService.spinner = '';
                        this.router.navigate(['main/create/edit'])
                        return prodByIdSuccessAction({ prodById: response })
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )))
    )

    updateProdEffect = createEffect(() =>
        this.actions.pipe(
            ofType(updateProdAction),
            exhaustMap((payload) =>
                this.prodService.updateProduct(payload.id, payload.prod).pipe(
                    map(response => {
                        this.prodService.openPreview(response)
                        this.location.back()
                        return allProdAction();
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                ))))


    deleteProdEffect = createEffect(() =>
        this.actions.pipe(
            ofType(deleteProdAction),
            exhaustMap((payload) =>
                this.prodService.deleteProduct(payload.id).pipe(
                    map(() => {
                        return allProdAction();
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                ))))

    allProdEffect = createEffect(() =>
        this.actions.pipe(
            ofType(allProdAction),
            exhaustMap(() =>
                this.prodService.getAllProducts().pipe(
                    map(response => {
                        this.mainService.preloaderRemoveProd = false;
                        return allProdSuccessAction({ products: response })
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )))
    )


    prodByIdeffect = createEffect(() =>
        this.actions.pipe(
            ofType(prodByIdAction),
            exhaustMap((payload) =>
                this.prodService.getPodById(payload.id).pipe(
                    map(response => {
                        this.mainService.spinner = '';
                        return prodByIdSuccessAction({ prodById: response })
                    }),
                    catchError((err) => {
                        this.authService.openErrorMessage(err.error.message)
                        return throwError(err)
                    })
                )))
    )

}