// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-colors-component',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './colors-component.component.html',
  styleUrls: ['./colors-component.component.scss']
})
export class ColorsComponentComponent {}
