import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { categoryGames, Game, Jackpot } from '../../models/game-jackpot.model';
import { ApiService } from '../../services/api.service';

import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-game-categories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-categories.component.html',
  styleUrls: ['./game-categories.component.scss'],
})
export class GameCategoriesComponent implements OnInit, OnDestroy {
  gamesSubscription: Subscription;
  jackpotsSubscription: Subscription;
  gameList: Array<Game>;
  jackpotList: Array<Jackpot>;

  constructor(
    private utilService: UtilService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initJackpotsSubscription();
    this.initGamesSubscription();
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  initGamesSubscription(): void {
    const currentCategory = this.currentCategory();
    this.gamesSubscription = this.utilService.games$.subscribe(
      (games: categoryGames[]) => {
        this.gameList = this.utilService.getGamesByCategory(
          games,
          currentCategory
        );
        this.cdr.detectChanges();
      }
    );
  }

  initJackpotsSubscription(): void {
    this.jackpotsSubscription = this.utilService.jackpots$.subscribe((e) => {
      this.jackpotList = e;
      this.addJackpots();
    });
  }

  addJackpots(): void {
    this.gameList &&
      this.gameList.map((item) => {
        const foundItem =
          this.jackpotList && this.jackpotList.find((e) => e.game === item.id);
        if (foundItem) {
          item.amount = foundItem.amount;
        }
      });
    this.cdr.detectChanges();
  }

  currentCategory(): string {
    return this.route.snapshot.data['categories'][0];
  }

  ngOnDestroy(): void {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
    if (this.jackpotsSubscription) {
      this.jackpotsSubscription.unsubscribe();
    }
  }
}
