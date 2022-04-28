import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { Performance } from "./performance.type";
import { SortDirection } from "./performances.component";

@Injectable({
  providedIn: "root",
})
export class PerformancesService {
  private readonly _performances: BehaviorSubject<Performance[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {}

  get performances$(): Observable<Performance[]> {
    return this._performances.asObservable();
  }

  getPerformances(): Observable<Performance[]> {
    return this._getPerformances();
  }

  getSortedPerformances(sortDirection: SortDirection): Observable<Performance[]> {
    return this._getPerformances(sortDirection);
  }

  private _getPerformances(sortDirection?: SortDirection): Observable<Performance[]> {
    const params = sortDirection ? `?sortBy=${sortDirection}` : "";
    return this._httpClient.get<Performance[]>(`api/performances${params}`).pipe(
      tap(performances => {
        this._performances.next(performances);
      })
    );
  }
}
