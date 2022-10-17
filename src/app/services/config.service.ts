import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {APIResponse, Games, Jackpots} from '../models/games.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private httpClient: HttpClient) {}
  getGamesList(): Observable<Games[]> {
    return this.httpClient.get<Games[]>(`${environment.url}/games.php`);
  }

  getJackpotsList(): Observable<Jackpots[]> {
    return this.httpClient.get<Jackpots[]>(`${environment.url}/jackpots.php`);
  }
}


