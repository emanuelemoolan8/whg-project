import { createSelector } from '@ngrx/store';
import * as fromCategories from '../reducer/games.reducer';



const selectSelf = (state: fromCategories.State) => state

export const getGames = createSelector(selectSelf, fromCategories.getGames);
