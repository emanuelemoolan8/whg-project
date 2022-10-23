import { createAction, props } from '@ngrx/store';
import { Game } from '../models/game-jackpot.model';

// request
export const getGamesList = createAction('[Games] Get Games');

// actions for response
export const getGamesListSuccess = createAction(
  '[Games] Get Games Success',
  props<{ games: Game[] }>()
);

export const getGamesListFailure = createAction(
  '[Games] Get Games Failure',
  props<{ error: any }>()
);
