import { createAction, props } from '@ngrx/store';
import { Games } from '../models/games.model';

// games
export const getGamesListSuccess = createAction(
  '[Categories] Get Categories Success',
  props<{ games: Games[] }>()
);

export const getGamesListFailure = createAction(
  '[Categories] Get Categories Failure',
  props<{ error: any }>()
);

// Jackpots
export const getJackpotsFailure = createAction(
  '[Categories] Get Destinations Failure'
);

export const getJackpotsSuccess = createAction(
  '[Categories] Get Destinations Success'
);
