import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./invoice-dashboard/invoice-dashboard.component').then((c) => c.InvoiceDashboardComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./invoice-create/invoice-create.component').then((c) => c.InvoiceCreateComponent)
      },
      {
        path: 'details',
        loadComponent: () => import('./invoice-details/invoice-details.component').then((c) => c.InvoiceDetailsComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./invoice-list/invoice-list.component').then((c) => c.InvoiceListComponent)
      },
      {
        path: 'edit',
        loadComponent: () => import('./invoice-edit/invoice-edit.component').then((c) => c.InvoiceEditComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
