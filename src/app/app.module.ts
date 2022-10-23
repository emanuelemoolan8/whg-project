import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { GameCategoriesComponent } from './components/game-categories/game-categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorsInterceptor } from './interceptors/https-errors.interceptor';
import { GameEffects } from './effects/games.effects';
import { gameFeatureKey, gameReducer } from './reducer/games.reducers';
import { JackpotEffects } from './effects/jackpots.effects';
import { jackpotFeatureKey, jackpotReducer } from './reducer/jackpots.reducers';

@NgModule({
  declarations: [AppComponent, TopNavBarComponent, GameCategoriesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    EffectsModule.forFeature([GameEffects, JackpotEffects]),
    StoreModule.forFeature(gameFeatureKey, gameReducer),
    StoreModule.forFeature(jackpotFeatureKey, jackpotReducer),

    StoreModule.forRoot(gameReducer, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
