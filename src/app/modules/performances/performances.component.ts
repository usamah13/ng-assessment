import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Performance } from './performance.type';
import { PerformancesService } from './performances.service';

@Component({
  selector: "app-performances",
  templateUrl: "performances.component.html",
  styles: [],
})
export class PerformancesComponent implements OnInit {
  performances$: Observable<Performance[]>;

  constructor(private performancesService: PerformancesService) {
    this.performances$ = this.performancesService.performances$;
  }

  ngOnInit(): void {}
}
