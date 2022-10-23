import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCategoriesComponent } from './components/game-categories/game-categories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'top-games' },
  {
    path: 'top-games',
    component: GameCategoriesComponent,
    data: { category: 'top' },
  },
  {
    path: 'new-games',
    component: GameCategoriesComponent,
    data: { category: 'new' },
  },
  {
    path: 'slots',
    component: GameCategoriesComponent,
    data: { category: 'slots' },
  },
  {
    path: 'jackpots',
    component: GameCategoriesComponent,
    data: { category: 'jackpots' },
  },
  {
    path: 'live',
    component: GameCategoriesComponent,
    data: { category: 'live' },
  },
  {
    path: 'blackjack',
    component: GameCategoriesComponent,
    data: { category: 'blackjack' },
  },
  {
    path: 'roulette',
    component: GameCategoriesComponent,
    data: { category: 'roulette' },
  },
  {
    path: 'table',
    component: GameCategoriesComponent,
    data: { category: 'table' },
  },
  {
    path: 'poker',
    component: GameCategoriesComponent,
    data: { category: 'poker' },
  },
  {
    path: 'others/fun',
    component: GameCategoriesComponent,
    data: { category: 'fun' },
  },
  {
    path: 'others/ball',
    component: GameCategoriesComponent,
    data: { category: 'ball' },
  },
  {
    path: 'others/virtual',
    component: GameCategoriesComponent,
    data: { category: 'virtual' },
  },
  { path: '**', pathMatch: 'full', redirectTo: 'top-games' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
