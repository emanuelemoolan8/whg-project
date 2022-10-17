import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, mergeMap } from 'rxjs';
import { Games, Jackpots } from '../models/games.model';
import { ConfigService } from './config.service';

@Injectable( {
  providedIn: 'root',
} )
export class UtilService
{
  categories = new Array<any>;
  private gamesSource = new BehaviorSubject<Games[]>( [] );
  games$ = this.gamesSource.asObservable();
  private jackpotsSource = new BehaviorSubject<Jackpots[]>( [] );
  jackpots$ = this.jackpotsSource.asObservable();

  constructor ( private configService: ConfigService ) { }

  getGameList ()
  {
    this.configService
      .getGamesList()
      .subscribe( ( params ) =>
      {
        const gameList = params;
        this.selectGamesByCategory( gameList );
      } );
    this.getJackpots();
  }


  selectGamesByCategory ( gameList: Games[] )
  {
    this.gameCategories().map( category =>
    {
      const gameCategoryObj: any = new Object();
      const categoryGames = gameList && gameList.filter( ( item ) => item.categories.includes( category ) );
      gameCategoryObj[ 'category' ] = category;
      gameCategoryObj[ 'games' ] = categoryGames;
      this.categories.push( gameCategoryObj );

    } );
    this.gamesSource.next( this.categories );

  }

  getGamesByCategory ( categorisedGames: any[], category: string )
  {
    const categoryGames = ( categorisedGames && categorisedGames.find( e => e.category === category ) );
    if ( !categoryGames )
    { return; }
    return categoryGames.games;
  }


  getJackpots ()
  {
    interval( 5 * 1000 )
      .pipe(
        mergeMap( () => this.configService.getJackpotsList() )
      )
      .subscribe( ( data: any ) =>
      {
        this.jackpotsSource.next( data );
      } );
  }

  menuItems ()
  {
    const list = [
      { name: 'Top Games', url: 'top-games' },
      { name: 'New Games', url: 'new-games' },
      { name: 'Slots', url: 'slots' },
      { name: 'Jackpots', url: 'jackpots' },
      { name: 'Live', url: 'live' },
      { name: 'Blackjack', url: 'blackjack' },
      { name: 'Roulette', url: 'roulette' },
      { name: 'Table', url: 'table' },
      { name: 'Poker', url: 'poker' },
      { name: 'Others', url: 'others' },
    ];
    return list;
  }

  gameCategories ()
  {
    return [ 'top', 'new', 'slots', 'jackpots', 'live', 'blackjack', 'roulette', 'table', 'poker', 'others' ];
  }

}
