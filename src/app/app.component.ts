import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gameCategories from '../app/reducer/games.reducer';
import {GameActionsApi} from './actions';
import { UtilService } from './services/util.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'WHG-project';

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.utilService.getGameList();
  }
}
