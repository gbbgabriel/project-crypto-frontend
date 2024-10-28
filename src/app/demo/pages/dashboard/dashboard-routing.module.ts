// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        loadComponent: () => import('./default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./analytics/analytics.component').then((c) => c.AnalyticsComponent)
      },
      {
        path: 'finance',
        loadComponent: () => import('./finance/finance.component').then((c) => c.FinanceComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
