import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'kanban',
        loadComponent: () => import('./kanban/kanban.component').then((c) => c.KanbanComponent)
      },
      {
        path: 'calender',
        loadChildren: () => import('./calender/calender.module').then((m) => m.CalenderModule)
      },
      {
        path: 'customer',
        loadComponent: () => import('./customer-list/customer-list.component').then((c) => c.CustomerListComponent)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'e-commerce',
        loadChildren: () => import('./e-commerce/e-commerce.module').then((m) => m.ECommerceModule)
      },
      {
        path: 'file-manager',
        loadComponent: () => import('./file-manager/file-manager.component').then((c) => c.FileManagerComponent)
      },
      {
        path: 'email',
        loadComponent: () => import('./email/email.component').then((c) => c.EmailComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {}
