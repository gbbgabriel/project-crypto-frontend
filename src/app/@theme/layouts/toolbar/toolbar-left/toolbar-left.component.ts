// angular import
import { Component, effect } from '@angular/core';

// project import
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';
import { HORIZONTAL, VERTICAL, COMPACT } from 'src/app/@theme/const';
import { SharedModule } from 'src/app/demo/shared/shared.module';

// rxjs

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './toolbar-left.component.html',
  styleUrls: ['./toolbar-left.component.scss']
})
export class NavLeftComponent {
  // public props
  showToggleMenu: boolean = true;

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    effect(() => {
      this.updateThemeLayout(this.themeService.layout());
    });
  }

  private updateThemeLayout(layout: string) {
    if (layout === VERTICAL) {
      this.showToggleMenu = true;
    }
    if (layout == HORIZONTAL) {
      this.showToggleMenu = false;
    }
    if (layout === COMPACT) {
      this.showToggleMenu = true;
    }
  }

  // public method
  toggleMenu() {
    this.themeService.toggleSideDrawer();
  }
}
