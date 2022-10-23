import { createFeatureSelector, createSelector } from '@ngrx/store';
//import { EventState } from '..';
import * as gameReducer from '../reducer/games.reducers';

export const gamesState = createFeatureSelector<gameReducer.State>(
  gameReducer.gameFeatureKey
);

export const selectGames = createSelector(
  gamesState,
  (state: gameReducer.State) => state.gamesList
);
