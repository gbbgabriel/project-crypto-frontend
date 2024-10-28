import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./helpdesk-dashboard/helpdesk-dashboard.component').then((c) => c.HelpdeskDashboardComponent)
      },
      {
        path: 'ticket',
        loadChildren: () => import('./helpdesk-ticket/helpdesk-ticket.module').then((m) => m.HelpdeskTicketModule)
      },
      {
        path: 'customer',
        loadComponent: () => import('./helpdesk-customer/helpdesk-customer.component').then((c) => c.HelpdeskCustomerComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskRoutingModule {}
