import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent implements OnInit {
  isOpen = false;
  constructor(private router: Router) {}

  ngOnInit (): void { }
  
  navigate (path: string)
  {
    this.router.navigate([path]);
  }
}
