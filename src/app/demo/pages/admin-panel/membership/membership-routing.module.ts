import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./membership-dashboard/membership-dashboard.component').then((c) => c.MembershipDashboardComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./membership-list/membership-list.component').then((c) => c.MembershipListComponent)
      },
      {
        path: 'price',
        loadComponent: () => import('./membership-price/membership-price.component').then((c) => c.MembershipPriceComponent)
      },
      {
        path: 'setting',
        loadComponent: () => import('./membership-setting/membership-setting.component').then((c) => c.MembershipSettingComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule {}
