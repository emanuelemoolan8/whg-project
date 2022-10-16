import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {APIResponse, Games} from '../models/games.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  baseUrl = 'http://stage.whgstage.com/front-end-test/';
  constructor(private httpClient: HttpClient) {}
  getGamesList ():Observable<Games[]>
  {
    console.log('calling...')
    return this.httpClient.get<Games[]>(`${environment.url}/games.php`);
  }
}


