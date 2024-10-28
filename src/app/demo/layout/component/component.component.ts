// angular import
import { Component } from '@angular/core';

// project import
import { componentMenus } from 'src/app/demo/data/component';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent {
  menus = componentMenus;
}
