import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'price-1',
        loadComponent: () => import('./pricing/pricing.component').then((c) => c.PricingComponent)
      },
      {
        path: 'price-2',
        loadComponent: () => import('./price-two/price-two.component').then((c) => c.PriceTwoComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRoutingModule {}
