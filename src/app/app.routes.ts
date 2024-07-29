import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'dashboard/:detailId',
    loadComponent: () =>
      import('./components/dashboard-details/dashboard-details.component').then(
        (m) => m.DashboardDetailsComponent,
      ),
  },
];
