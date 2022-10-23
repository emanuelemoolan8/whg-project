import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Game, Jackpot } from '../../models/game-jackpot.model';

import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { select, Store } from '@ngrx/store';
import { selectGames } from 'src/app/selectors/games.selectors';
import { State } from 'src/app/reducer/games.reducers';
import { selectJackpots } from 'src/app/selectors/jackpots.selectors';
import { CATEGORY, JACKPOTS } from 'src/app/constants/games.const';

@Component({
  selector: 'app-game-categories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-categories.component.html',
  styleUrls: ['./game-categories.component.scss'],
})
export class GameCategoriesComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  gameList: Array<Game>;
  currentCategoryGames: Array<Game>;
  games$: Observable<Array<Game>> = this.store.pipe(select(selectGames));
  jackpots$: Observable<Array<Jackpot>> = this.store.pipe(
    select(selectJackpots)
  );

  constructor(
    private utilService: UtilService,
    private route: ActivatedRoute,
    private store: Store<State>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initGamesSubscription();
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  initGamesSubscription(): void {
    this.subscriptions.push(
      this.games$.subscribe((games: Game[]) => {
        this.gameList = games;
        this.currentCategoryGames = this.utilService.currentCategoryGames(
          this.currentCategory()
        );
        this.initJackpotsSubscription();
        this.cdr.detectChanges();
      })
    );
  }

  initJackpotsSubscription(): void {
    this.subscriptions.push(
      this.jackpots$.subscribe((jackpots) => {
        this.currentCategoryGames =
          this.currentCategory() === JACKPOTS
            ? this.utilService.generateJackpotsCategory(jackpots, this.gameList)
            : this.utilService.addJackpots(jackpots, this.currentCategoryGames);
        this.cdr.detectChanges();
      })
    );
  }

  currentCategory = (): string => this.route.snapshot.data[CATEGORY];

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
