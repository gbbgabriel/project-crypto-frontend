import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilesComponent } from './user-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfilesComponent,
    children: [
      {
        path: '',
        redirectTo: '/application/profile/user/personal',
        pathMatch: 'full'
      },
      {
        path: 'personal',
        loadComponent: () => import('./us-personal/us-personal.component').then((c) => c.UsPersonalComponent)
      },
      {
        path: 'payment',
        loadComponent: () => import('./us-payment/us-payment.component').then((c) => c.UsPaymentComponent)
      },
      {
        path: 'password',
        loadComponent: () => import('./us-password/us-password.component').then((c) => c.UsPasswordComponent)
      },
      {
        path: 'setting',
        loadComponent: () => import('./us-setting/us-setting.component').then((c) => c.UsSettingComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilesRoutingModule {}
