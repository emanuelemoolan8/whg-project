import { createAction, props } from '@ngrx/store';
import { Games } from '../models/games.model';

// games
export const getGamesList = createAction('[Categories] Get Categories');

// Jackpots

export const getJackpots = createAction('[Categories] Get Destinations');