import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as jackpotReducer from '../reducer/jackpots.reducers';

export const jackpotsState = createFeatureSelector<jackpotReducer.State>(
  jackpotReducer.jackpotFeatureKey
);

export const selectJackpots = createSelector(
  jackpotsState,
  (state: jackpotReducer.State) => state.jackpotsList
);
