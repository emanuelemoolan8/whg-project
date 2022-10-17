import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store,select, State } from '@ngrx/store';
import { BehaviorSubject, interval, map, mergeMap, Observable, Subscription, switchMap, tap, withLatestFrom } from 'rxjs';
import { APIResponse, Games, Jackpots } from '../../models/games.model';
import { ConfigService } from '../../services/config.service';
import * as gameCategories from '../../reducer/games.reducer';
import * as gameSelector from '../../selectors/games.selectors';
import * as GameActions from '../../actions/games.actions';
import * as GameActionsApi from '../../actions/games.actions-api';

import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-game-categories',
  templateUrl: './game-categories.component.html',
  styleUrls: ['./game-categories.component.scss'],
})
export class GameCategoriesComponent implements OnInit, OnDestroy {
  gamesListSubscription: Subscription;
  jackpotSubscription: Subscription;
  gameList: Array<Games>;
  categorisedGames: Array<Games>;
  jackpotList: Array<Jackpots>;

  private currentCategories: string[] = [];

  constructor(
    private configService: ConfigService,
    private utilService: UtilService,

    private store: Store<gameCategories.State>,
    private route: ActivatedRoute
  ) {}
  gameCategories$: Observable<Games[]> = this.store.pipe(
    select(gameSelector.getGames)
  );

  ngOnInit(): void {
    //this.getJackpots();
    this.getGameList();
  }

  getGameList() {
    // this.gameList = this.utilService.games$.pipe(
    //   map((games) =>
    //     games.filter((game) =>
    //       game.categories.some((category) =>
    //         this.currentCategories.includes(category)
    //       )
    //     )
    //   )
    // );
    const category = this.route.snapshot.data['categories'][0];

    this.gamesListSubscription = this.utilService.games$.subscribe(
      (e) => {
        this.categorisedGames = e;
        this.gameList = this.utilService.getGamesByCategory(
          this.categorisedGames, category
        );
      }
    );

        this.jackpotSubscription = this.utilService.jackpots$.subscribe((e) => {
          this.jackpotList = e;
          this.addJackpots();
        });

    // this.jackpotSubscription = this.utilService.categories$.subscribe((e) => {
    //   this.gameList = e;
    // });
    // this.store.dispatch(GameActionsApi.getGamesList());
    // this.gamesListSubscription = this.configService
    //   .getGamesList()
    //   .subscribe((params) => {
    //     this.gameList = params;
    //     console.log(this.gameList);
    //     this.selectGamesByCategory();
    //   });
    // this.getGamesListResponse();
  }



  // getGamesListResponse() {
  //   this.gamesListSubscription = this.gameCategories$.subscribe((data: any) => {
  //     if (data) {
  //       this.jackpotList = data;
  //       console.log(this.jackpotList);
  //       this.selectGamesByCategory();
  //     }
  //   });
  // }

  // selectGamesByCategory() {
  //   const category = this.route.snapshot.data['categories'][0];
  //   this.gameList =
  //     this.gameList &&
  //     this.gameList.filter((item) => item.categories.includes(category));
  //   console.log(this.gameList);
  //   this.addJackpots();
  // }

  addJackpots() {
    this.gameList &&
      this.gameList.map((item) => {
        const foundItem =
          this.jackpotList && this.jackpotList.find((e) => e.game === item.id);
        if (foundItem) {
          item.amount = foundItem.amount;
        }
      });
  }

  ngOnDestroy() {
    if (this.gamesListSubscription) {
      this.gamesListSubscription.unsubscribe();
    }
    if (this.jackpotSubscription) {
      this.jackpotSubscription.unsubscribe();
    }
  }
}
