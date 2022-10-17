import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent {
  constructor(private router: Router, private utilService: UtilService, private location: Location) {}
  menuItems = this.utilService.menuItems();
  clickedItem: String;
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clickedItem = this.location.path().substring(1);
    console.log( window.location.href );
    console.log(this.location.path().substring(1));
  }
  navigate(path: string, sidenav:any) {
    this.router.navigate( [ path ] );
    this.clickedItem = this.location.path();
    console.log( path );
    if ( sidenav )
    {
      sidenav.toggle();
    }
  }

  checkClickedItem (item:string)
  {
   return this.clickedItem === item;
  }
}
