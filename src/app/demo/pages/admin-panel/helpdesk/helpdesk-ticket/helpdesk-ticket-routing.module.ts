import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        loadComponent: () => import('./ticket-create/ticket-create.component').then((c) => c.TicketCreateComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./ticket-list/ticket-list.component').then((c) => c.TicketListComponent)
      },
      {
        path: 'details',
        loadComponent: () => import('./ticket-details/ticket-details.component').then((c) => c.TicketDetailsComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskTicketRoutingModule {}
