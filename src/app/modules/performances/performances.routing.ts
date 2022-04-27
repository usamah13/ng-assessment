import { Route } from '@angular/router';

import { PerformancesComponent } from './performances.component';

export const performancesRoutes: Route[] = [
  {
    path: "",
    component: PerformancesComponent,
    resolve: {
      // data: ProjectResolver
    },
  },
];
