import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product',
        loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent)
      },
      {
        path: 'product-details/:productId',
        loadComponent: () => import('./product-details/product-details.component').then((c) => c.ProductDetailsComponent)
      },
      {
        path: 'product-list',
        loadComponent: () => import('./product-list/product-list.component').then((c) => c.ProductListComponent)
      },
      {
        path: 'new-product',
        loadComponent: () => import('./new-product/new-product.component').then((c) => c.NewProductComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout.component').then((c) => c.CheckoutComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule {}
