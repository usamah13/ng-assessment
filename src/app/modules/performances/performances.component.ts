import { KeyValue } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Performance } from "./performance.type";
import { PerformancesService } from "./performances.service";

export type SortDirection = "time:slowToFast" | "time:fastToSlow" | "year:frToSr" | "year:srToFr";

interface MenuOption {
  active: boolean;
  sortBy: SortDirection;
  showDivider?: boolean;
}

@Component({
  selector: "app-performances",
  templateUrl: "performances.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformancesComponent implements OnInit, OnDestroy {
  readonly performances$: Observable<Performance[]>;
  readonly menuOptions: Map<string, MenuOption>;

  private readonly subscription: Subscription;

  constructor(private performancesService: PerformancesService) {
    this.subscription = new Subscription();
    this.performances$ = this.performancesService.performances$;
    this.menuOptions = new Map();
  }

  ngOnInit(): void {
    this.initializeMenu();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onMenuItemClick(selectedSortLabel: string, selectedOption: MenuOption): void {
    // set all options as inactive
    for (const [label, menuOption] of this.menuOptions.entries())
      this.menuOptions.get(label).active = false;

    if (!this.menuOptions.get(selectedSortLabel).active)
      this.getSortedPerformances(selectedOption.sortBy);

    // set the selected option to active
    this.menuOptions.get(selectedSortLabel).active = true;
  }

  trackByMenuOption(index: number, menuOption: KeyValue<string, MenuOption>): string {
    return menuOption.key;
  }

  trackByPerformance(index: number, performance: Performance): string {
    return performance.id;
  }

  private getSortedPerformances(sortDirection: SortDirection): void {
    this.subscription.add(
      this.performancesService.getSortedPerformances(sortDirection).subscribe()
    );
  }

  private initializeMenu(): void {
    this.menuOptions.set("Time: Fast to Slow", { active: false, sortBy: "time:fastToSlow" });
    this.menuOptions.set("Time: Slow to Fast", { active: false, sortBy: "time:slowToFast" });
    this.menuOptions.set("Year: Freshman to Senior", {
      active: true,
      sortBy: "year:frToSr",
      showDivider: true,
    });
    this.menuOptions.set("Year: Senior to Freshman", { active: false, sortBy: "year:srToFr" });
  }
}
