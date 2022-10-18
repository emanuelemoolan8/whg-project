import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable, retry } from 'rxjs';
import { Game, Jackpot } from '../models/game-jackpot.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  getGamesList(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${environment.url}/games.php`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  getJackpotsList(): Observable<Jackpot[]> {
    return this.httpClient
      .get<Jackpot[]>(`${environment.url}/jackpots.php`)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.handleError(err);
          return EMPTY;
        })
      );
  }

  handleError(err: any): void {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
    }
  }
}
