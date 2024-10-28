// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { PaginatorRoutingModule } from './paginator-routing.module';
import { PaginatorComponent } from './paginator.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, PaginatorRoutingModule, SharedModule, HttpClientModule, MatNativeDateModule]
})
export class PaginatorModule {}
