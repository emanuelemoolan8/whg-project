import { createReducer, on } from '@ngrx/store';
import {
  getJackpots,
  getJackpotsSuccess,
  getJackpotsFailure,
  getGamesList,
  getGamesListSuccess,
  getGamesListFailure,
} from '../actions/games.actions';
import { Games, Jackpots} from '../models/games.model';


export interface State {
    gamesList: Games[] ;
    jackpots: Jackpots[];
}

export const initialState: State = {
  gamesList: [],
  jackpots: [],
};

export const reducer = createReducer(
  initialState,
  on(getGamesList, (state) => ({
    ...state
  })),
  on(getGamesListSuccess, (state, { games }) => ({
    ...state,
    gamesList: games,
  }))
);
  
export const getGames = ( state: State ) => state.gamesList;
