import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { menuItems, othersMenuItems } from '../../constants/games.const';

@Component({
  selector: 'app-top-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent {
  constructor(private router: Router, private location: Location) {}
  menuItems = menuItems;
  othersMenuItems = othersMenuItems;
  clickedItem: string;
  selectedOthersMenu: boolean = false;

  ngOnInit(): void {
    this.clickedItem = this.getCategoryFromPath(this.location.path());
    this.selectedOthersMenu = this.checkSelectedItemInOthers(this.clickedItem);
  }

  navigate(path: string, sidenav: any): void {
    this.router.navigate([path]);
    this.clickedItem = path;
    this.selectedOthersMenu = this.checkSelectedItemInOthers(path);
    if (sidenav) {
      sidenav.toggle();
    }
  }

  checkClickedItem = (item: string) => this.clickedItem === item;

  getCategoryFromPath = (path: string) => {
    return path.charAt(0) === '/' ? path.substring(1) : path;
  };

  checkSelectedItemInOthers = (path: string) =>
    this.othersMenuItems.some((item) => item.url === path);
}
