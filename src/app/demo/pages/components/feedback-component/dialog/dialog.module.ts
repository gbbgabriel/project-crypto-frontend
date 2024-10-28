// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { DialogRoutingModule } from './dialog-routing.module';
import {
  DialogComponent,
  DialogAnimationsComponent,
  DialogAnimationsScrollComponent,
  DialogAnimationsInjectingDataComponent,
  DialogAnimationsElementComponent
} from './dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@NgModule({
  declarations: [
    DialogComponent,
    DialogAnimationsComponent,
    DialogAnimationsScrollComponent,
    DialogAnimationsInjectingDataComponent,
    DialogAnimationsElementComponent
  ],
  imports: [CommonModule, DialogRoutingModule, MatNativeDateModule, HttpClientModule, SharedModule]
})
export class DialogModule {}
