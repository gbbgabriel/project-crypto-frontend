import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'layout',
        loadChildren: () => import('./frm-layouts/frm-layouts.module').then((m) => m.FrmLayoutsModule)
      },
      {
        path: 'plugins',
        loadChildren: () => import('./frm-plugins/frm-plugins.module').then((m) => m.FrmPluginsModule)
      },
      {
        path: 'validation',
        loadComponent: () => import('./forms-validation/forms-validation.component').then((c) => c.FormsValidationComponent)
      },
      {
        path: 'wizard',
        loadComponent: () => import('./forms-wizard/forms-wizard.component').then((c) => c.FormsWizardComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
