import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { PerformancesService } from "./performances.service";

@Injectable({
  providedIn: "root",
})
export class PerformancesResolver implements Resolve<any> {
  constructor(private _performancesService: PerformancesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._performancesService.getSortedPerformances("year:frToSr");
  }
}
