import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Performance } from "./performance.type";
import { PerformancesService } from "./performances.service";

export type SortDirection = "time:slowToFast" | "time:fastToSlow" | "year:frToSr" | "year:srToFr";

interface MenuOption {
  label: string;
  active: boolean;
  sortBy: SortDirection;
  showDivider?: boolean;
}

@Component({
  selector: "app-performances",
  templateUrl: "performances.component.html",
  styles: [],
})
export class PerformancesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  performances$: Observable<Performance[]>;
  menuOptions: { [label: string]: MenuOption };

  constructor(private performancesService: PerformancesService) {
    this.subscription = new Subscription();
    this.performances$ = this.performancesService.performances$;
    this.menuOptions = {
      "Time: Fast to Slow": {
        active: false,
        label: "Time: Fast to Slow",
        sortBy: "time:fastToSlow",
      },
      "Time: Slow to Fast": {
        active: false,
        label: "Time: Slow to Fast",
        sortBy: "time:slowToFast",
      },
      "Year: Freshman to Senior": {
        active: true,
        label: "Year: Freshman to Senior",
        sortBy: "year:frToSr",
        showDivider: true,
      },
      "Year: Senior to Freshman": {
        active: false,
        label: "Year: Senior to Freshman",
        sortBy: "year:srToFr",
      },
    };
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onMenuItemClick(selectedOption: MenuOption): void {
    // set all options to false
    for (const o of Object.values(this.menuOptions)) this.menuOptions[o.label].active = false;

    if (!this.menuOptions[selectedOption.label].active) {
      this.getSortedPerformances(selectedOption.sortBy);
    }

    // set the selected option to active
    this.menuOptions[selectedOption.label].active = true;
  }

  private getSortedPerformances(sortDirection: SortDirection): void {
    this.subscription.add(
      this.performancesService.getSortedPerformances(sortDirection).subscribe()
    );
  }
}
