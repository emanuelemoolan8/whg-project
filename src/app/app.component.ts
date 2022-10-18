import { Component } from '@angular/core';
import { UtilService } from './services/util.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'WHG-Project-EM';

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.utilService.getGameList();
  }
}
