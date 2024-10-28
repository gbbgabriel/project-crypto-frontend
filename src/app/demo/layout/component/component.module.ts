// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { ComponentRoutingModule } from './component-routing.module';
import { ComponentComponent } from './component.component';
import { ComponentNavigationComponent } from 'src/app/@theme/components/navigation';

@NgModule({
  declarations: [ComponentComponent],
  imports: [CommonModule, ComponentRoutingModule, ComponentNavigationComponent]
})
export class ComponentModule {}
