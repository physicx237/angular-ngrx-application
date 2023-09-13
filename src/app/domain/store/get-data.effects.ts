import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { GetDataService } from '../../adapters/get-data.service';
import * as GetDataActions from './get-data.actions'

@Injectable()
export class GetDataEffects {

    loadDocuments$ = createEffect(() => this.actions$.pipe(
        ofType(GetDataActions.getDocumentsFromEffects),
        exhaustMap(() => this.getDataService.getDocuments()
            .pipe(
                map(documents => GetDataActions.getDocuments({ payload: documents })),
                catchError(() => EMPTY)
            ))
    ),
    );

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(GetDataActions.getCategoriesFromEffects),
        exhaustMap(() => this.getDataService.getCategories()
            .pipe(
                map(categories => GetDataActions.getCategories({ payload: categories })),
                catchError(() => EMPTY)
            ))
    ),
    );

    constructor(
        private actions$: Actions,
        private getDataService: GetDataService,
    ) { }
}