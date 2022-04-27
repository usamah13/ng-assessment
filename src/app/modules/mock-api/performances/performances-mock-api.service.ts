import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { AppMockApiService } from '../mock-api.service';
import { performances as performancesData } from './data';

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

      // Sort the performances by the name field by default
      // performances.sort((a, b) => a.name.localeCompare(b.name));

      // Return the response
      return [200, performances];
    });
  }
}
