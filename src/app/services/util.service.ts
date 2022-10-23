import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { categoryGames, Game, Jackpot } from '../models/game-jackpot.model';
import {
  CATEGORY,
  gameCategories,
  GAMES,
  INTERVAL_TIME,
  JACKPOTS,
} from '../constants/games.const';
import { select, Store } from '@ngrx/store';
import { State } from '../reducer/games.reducers';
import { selectJackpots } from '../selectors/jackpots.selectors';
import { GameActions, JackpotActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  sortedGamesByCategory = new Array<categoryGames>();
  constructor(private store: Store<State>) {}

  // api requests - games & jackpots
  getGames = () => this.store.dispatch(GameActions.getGamesList());

  getJackpots = () =>
    timer(0, INTERVAL_TIME).subscribe(() =>
      this.store.dispatch(JackpotActions.getJackpotsList())
    );

  // games functions
  sortGamesByCategory = (games: Game[]) => {
    // sorting games by category
    gameCategories.map((category: string) => {
      const gameCategoryObj: any = new Object();
      const categoryGames =
        games && games.filter((item) => item.categories.includes(category));
      gameCategoryObj[CATEGORY] = category;
      gameCategoryObj[GAMES] = categoryGames;
      this.sortedGamesByCategory.push(gameCategoryObj);
    });
  };

  currentCategoryGames = (category: string) => {
    const categoryGamesArray =
      this.sortedGamesByCategory &&
      this.sortedGamesByCategory.find((item) => item.category === category);
    if (!categoryGamesArray) {
      return [];
    }
    return categoryGamesArray.games;
  };

  // jackpot functions
  generateJackpotsCategory = (jackpots: Jackpot[], games: Game[]) =>
    this.addJackpots(jackpots, games).filter((game) =>
      game.categories.includes(JACKPOTS)
    );

  addJackpots(jackpots: Jackpot[], games: Game[]) {
    games &&
      games.map((game) => {
        const foundItem =
          jackpots && jackpots.find((jackpot) => jackpot.game === game.id);
        if (foundItem) {
          game.amount = foundItem.amount;
          !game.categories.includes(JACKPOTS) && game.categories.push(JACKPOTS);
        }
      });
    return games;
  }
}
