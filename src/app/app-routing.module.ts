import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCategoriesComponent } from './components/game-categories/game-categories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'top-games' },
  {
    path: 'top-games',
    component: GameCategoriesComponent,
    data: { categories: ['top'] },
  },
  {
    path: 'new-games',
    component: GameCategoriesComponent,
    data: { categories: ['new'] },
  },
  {
    path: 'slots',
    component: GameCategoriesComponent,
    data: { categories: ['slots'] },
  },
  {
    path: 'jackpots',
    component: GameCategoriesComponent,
    data: { categories: ['jackpot'] },
  },
  {
    path: 'live',
    component: GameCategoriesComponent,
    data: { categories: ['live'] },
  },
  {
    path: 'blackjack',
    component: GameCategoriesComponent,
    data: { categories: ['blackjack'] },
  },
  {
    path: 'roulette',
    component: GameCategoriesComponent,
    data: { categories: ['roulette'] },
  },
  {
    path: 'table',
    component: GameCategoriesComponent,
    data: { categories: ['table'] },
  },
  {
    path: 'poker',
    component: GameCategoriesComponent,
    data: { categories: ['poker'] },
  },
  {
    path: 'others',
    component: GameCategoriesComponent,
    data: { categories: ['others'] },
  },
  { path: '**', pathMatch: 'full', redirectTo: 'top-games' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
