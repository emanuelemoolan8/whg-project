import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store,select, State } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { APIResponse, Games } from '../models/games.model';
import { ConfigService } from '../services/config.service';
import * as gameCategories from '../reducer/games.reducer';
import * as gameSelector from '../selectors/games.selectors';
import * as gameActions from '../actions/games.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-categories',
  templateUrl: './game-categories.component.html',
  styleUrls: ['./game-categories.component.scss'],
})
export class GameCategoriesComponent implements OnInit, OnDestroy {
  gamesListSubscription: Subscription;
  gameList: Array<Games>;
  private currentCategories: string[] = [];

  constructor(
    private configService: ConfigService,
    private store: Store<gameCategories.State>,
    private route: ActivatedRoute
  ) {}
  gameCategories$: Observable<Games[]> = this.store.pipe(
    select(gameSelector.getGames)
  );

  ngOnInit(): void {
    this.gamesListSubscription = this.configService
      .getGamesList()
      .subscribe((params) => {
        this.gameList = params;
        console.log(this.gameList);
        this.selectGamesByCategory();
      });
  }

  calltheApi() {
    console.log('initial');
    const res = this.configService.getGamesList();
    console.log(res);
  }

  selectGamesByCategory() {
    const category = (this.route.snapshot.data['categories'][0]);
    this.gameList = this.gameList.filter((item) =>
      item.categories.includes(category)
    );
    console.log(this.gameList);
  }

  ngOnDestroy() {
    if (this.gamesListSubscription) {
      this.gamesListSubscription.unsubscribe();
    }
  }
}
