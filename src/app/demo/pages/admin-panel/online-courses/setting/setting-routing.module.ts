import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'payment',
        loadComponent: () => import('./payment/payment.component').then((c) => c.PaymentComponent)
      },
      {
        path: 'price',
        loadComponent: () => import('./pricing/pricing.component').then((c) => c.PricingComponent)
      },
      {
        path: 'notification',
        loadComponent: () => import('./notification/notification.component').then((c) => c.NotificationComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
