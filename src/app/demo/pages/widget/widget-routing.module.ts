// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'statistics',
        loadComponent: () => import('./statistics/statistics.component').then((c) => c.StatisticsComponent)
      },
      {
        path: 'data',
        loadComponent: () => import('./widget-data/widget-data.component').then((c) => c.WidgetDataComponent)
      },
      {
        path: 'chart',
        loadComponent: () => import('./chart/chart.component').then((c) => c.WidgetChartComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule {}
