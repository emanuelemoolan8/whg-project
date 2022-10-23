import { createAction, props } from '@ngrx/store';
import { Jackpot } from '../models/game-jackpot.model';

// request
export const getJackpotsList = createAction('[Jackpots] Get Jackpots');

export const getJackpotsListSuccess = createAction(
  '[Jackpots] Get Jackpots Success',
  props<{ jackpots: Jackpot[] }>()
);
// actions for response

export const getJackpotsListFailure = createAction(
  '[Jackpots] Get Jackpots Failure',
  props<{ error: any }>()
);
