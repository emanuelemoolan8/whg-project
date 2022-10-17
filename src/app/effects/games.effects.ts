import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  getJackpotsSuccess,
  getJackpotsFailure,
  getGamesListSuccess,
  getGamesListFailure,
} from '../actions/games.actions';
import { ConfigService } from '../services/config.service';
import * as gameCategories from '../reducer/games.reducer';
import { getGamesList } from '../actions/games.actions-api';
import { GameActions}  from '../actions';


@Injectable()
export class GameEffects {
  getGamesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGamesList),
      exhaustMap(() => {
        console.log('calling effects');
        return this.configService.getGamesList().pipe(
          map( ( res ) =>
          {
            const games = res;
            console.log( games );
            console.log( 'calling success' );
            
            return GameActions.getGamesListSuccess({ games: games });
          }),
          catchError((error) => {
            console.log(error);
            return of(
              getGamesListFailure({
                error: error,
              })
            );
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private configService: ConfigService,
    private store: Store<gameCategories.State>
  ) {}
}
