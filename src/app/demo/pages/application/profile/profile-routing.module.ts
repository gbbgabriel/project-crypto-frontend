import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'account',
        loadChildren: () => import('./account-profile/account-profile.module').then((c) => c.AccountProfileModule)
      },
      {
        path: 'social',
        loadComponent: () => import('./social-profile/social-profile.component').then((c) => c.SocialProfileComponent)
      },
      {
        path: 'user',
        loadChildren: () => import('./user-profiles/user-profiles.module').then((m) => m.UserProfilesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
