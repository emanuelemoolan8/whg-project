import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, timer } from 'rxjs';
import { categoryGames, Game, Jackpot } from '../models/game-jackpot.model';
import { ApiService } from './api.service';
import { gameCategories, jackpotIntervalTime } from '../constants/games.const';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  categories = new Array<any>();
  private gamesSource = new BehaviorSubject<categoryGames[]>([]);
  games$ = this.gamesSource.asObservable();
  private jackpotsSource = new BehaviorSubject<Jackpot[]>([]);
  jackpots$ = this.jackpotsSource.asObservable();

  constructor(private apiService: ApiService) {}

  getGameList() {
    this.apiService.getGamesList().subscribe((games: Game[]) => {
      this.selectGamesByCategory(games);
    });
    this.getJackpots();
  }

  selectGamesByCategory(games: Game[]) {
    gameCategories.map((category: string) => {
      const gameCategoryObj: any = new Object();
      const categoryGames =
        games && games.filter((item) => item.categories.includes(category));
      gameCategoryObj['category'] = category;
      gameCategoryObj['games'] = categoryGames;
      this.categories.push(gameCategoryObj);
    });
    this.gamesSource.next(this.categories);
  }

  getJackpots() {
    timer(0, jackpotIntervalTime)
      .pipe(mergeMap(() => this.apiService.getJackpotsList()))
      .subscribe((data: any) => {
        this.jackpotsSource.next(data);
      });
  }

  getGamesByCategory(categoryGames: categoryGames[], category: string) {
    const categoryGamesArray: any =
      categoryGames && categoryGames.find((item) => item.category === category);
    if (!categoryGamesArray) {
      return [];
    }
    return categoryGamesArray.games;
  }
}
