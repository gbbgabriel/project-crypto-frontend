// Angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-mask-form',
  standalone: true,
  imports: [CommonModule, SharedModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './mask-form.component.html',
  styleUrls: ['./mask-form.component.scss'],
  providers: [provideNgxMask()]
})
export class MaskFormComponent {}
