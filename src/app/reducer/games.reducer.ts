import { createReducer, on } from '@ngrx/store';
import {GameActionsApi, GameActions} from '../actions'
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
  on(GameActionsApi.getGamesList, (state) => ({
    ...state,
  })),
  on(GameActions.getGamesListSuccess, (state, { games }) => ({
    ...state,
    gamesList: games,
  }))
);
  
export const getGames = ( state: State ) =>
{
  console.log( state );
  return state.gamesList;
};
