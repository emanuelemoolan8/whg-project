import { createReducer, on } from '@ngrx/store';
import { Game, Jackpot } from '../models/game-jackpot.model';
import * as GameActions from '../actions/games.actions';

export const gameFeatureKey = 'games';

export interface State {
  gamesList: Game[];
}

export const initialState: State = {
  gamesList: [],
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.getGamesList, (state) => ({ ...state })),
  on(GameActions.getGamesListSuccess, (state, { games }) => ({
    ...state,
    gamesList: games,
  })),
  on(GameActions.getGamesListFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
