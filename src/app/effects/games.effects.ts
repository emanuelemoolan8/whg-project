import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  getJackpots,
  getJackpotsSuccess,
  getJackpotsFailure,
  getGamesList,
  getGamesListSuccess,
  getGamesListFailure,
} from '../actions/games.actions';
import { ConfigService } from '../services/config.service';
import * as gameCategories from '../reducer/games.reducer';
import { Games } from '../models/games.model';

@Injectable()
export class GameEffects {
  getGamesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGamesList),
      exhaustMap(() => {
        console.log('calling effects');
        return this.configService.getGamesList().pipe(
          map( ( res:any ) =>
          {
            const games = res;
            console.log(res)
            return getGamesListSuccess({ games });
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
