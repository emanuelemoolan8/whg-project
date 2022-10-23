import { createReducer, on } from '@ngrx/store';
import { Jackpot } from '../models/game-jackpot.model';
import { JackpotActions } from '../actions';

export const jackpotFeatureKey = 'jackpots';

export interface State {
  jackpotsList: Jackpot[];
}

export const initialState: State = {
  jackpotsList: [],
};

export const jackpotReducer = createReducer(
  initialState,
  on(JackpotActions.getJackpotsList, (state) => ({ ...state })),
  on(JackpotActions.getJackpotsListSuccess, (state, { jackpots }) => ({
    ...state,
    jackpotsList: jackpots,
  })),
  on(JackpotActions.getJackpotsListFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
