import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styles: [],
})
export class AppComponent implements OnInit {
  title = "ng-assessment";

  menuIsOpen: boolean;

  constructor() {
    this.menuIsOpen = false;
  }

  ngOnInit(): void {}

  onToggleMenu(): void {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
