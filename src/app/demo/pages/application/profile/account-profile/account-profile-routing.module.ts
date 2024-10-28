import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProfileComponent } from './account-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AccountProfileComponent,
    children: [
      {
        path: '',
        redirectTo: '/application/profile/account/profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadComponent: () => import('./ac-profile/ac-profile.component').then((c) => c.AcProfileComponent)
      },
      {
        path: 'personal',
        loadComponent: () => import('./ac-personal/ac-personal.component').then((c) => c.AcPersonalComponent)
      },
      {
        path: 'account',
        loadComponent: () => import('./ac-account/ac-account.component').then((c) => c.AcAccountComponent)
      },
      {
        path: 'password',
        loadComponent: () => import('./ac-password/ac-password.component').then((c) => c.AcPasswordComponent)
      },
      {
        path: 'role',
        loadComponent: () => import('./ac-role/ac-role.component').then((c) => c.AcRoleComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./ac-setting/ac-setting.component').then((c) => c.AcSettingComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProfileRoutingModule {}
