import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash-es";

import { Performance } from "../../performances/performance.type";
import { SortDirection } from "../../performances/performances.component";
import { AppMockApiService } from "../mock-api.service";
import { performances as performancesData } from "./data";

@Injectable({
  providedIn: "root",
})
export class PerformancesMockApiService {
  private _performances: any[] = performancesData;

  /**
   * Constructor
   */
  constructor(private _appMockApiService: AppMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Performances - GET
    // -----------------------------------------------------------------------------------------------------
    this._appMockApiService.onGet("api/performances").reply(() => {
      // Clone the performances
      const performances = cloneDeep(this._performances);

      // Return the response
      return [200, performances];
    });

    const sortConfig = {
      "FR-1": 0,
      "SO-2": 1,
      "JR-3": 2,
      "SR-4": 3,
    };
    const sortByFrToSr: SortDirection = "year:frToSr";
    const sortBySrToFr: SortDirection = "year:srToFr";

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByFrToSr}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the name field by default
      performances.sort((a, b) => {
        return sortConfig[a.year] - sortConfig[b.year];
      });

      // Return the response
      return [200, performances];
    });

    this._appMockApiService.onGet(`api/performances?sortBy=${sortBySrToFr}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the name field by default
      performances.sort((a, b) => {
        return sortConfig[b.year] - sortConfig[a.year];
      });

      // Return the response
      return [200, performances];
    });
  }
}
