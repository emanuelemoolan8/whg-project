import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { JackpotActions } from '../actions';
import { ApiService } from '../services/api.service';

@Injectable()
export class JackpotEffects {
  getJackpotsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JackpotActions.getJackpotsList),
      exhaustMap(() => {
        return this.apiService.getJackpotsList().pipe(
          map((result) =>
            JackpotActions.getJackpotsListSuccess({ jackpots: result })
          ),
          catchError((error) =>
            of(JackpotActions.getJackpotsListFailure({ error }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
