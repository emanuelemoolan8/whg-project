import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { GameActions } from '../actions';
import { ApiService } from '../services/api.service';
import { UtilService } from '../services/util.service';

@Injectable()
export class GameEffects {
  getGamesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getGamesList),
      exhaustMap(() => {
        return this.apiService.getGamesList().pipe(
          map( ( result ) =>
          {
            this.utilService.sortGamesByCategory(result);
            return GameActions.getGamesListSuccess( { games: result } );
          } ),
          catchError((error) => of(GameActions.getGamesListFailure({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}
}
