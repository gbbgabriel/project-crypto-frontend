// angular import
import { Component, Input, OnInit, ViewChild, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

// project import
import { NavigationItem } from '../../types/navigation';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { ThemeLayoutService } from '../../services/theme-layout.service';
import { MIN_WIDTH_1025PX, MAX_WIDTH_1024PX } from 'src/app/@theme/const';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ComponentGroupComponent } from './group/group.component';

@Component({
  selector: 'app-component-navigation',
  standalone: true,
  imports: [SharedModule, BreadcrumbComponent, RouterModule, ComponentGroupComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class ComponentNavigationComponent implements OnInit {
  // public props
  @Input() menus: NavigationItem[];
  @ViewChild('menuSide') menuSide: MatDrawer;

  windowWidth = window.innerWidth;
  modeValue: MatDrawerMode = 'side';
  searchMenus: string;
  direction = 'ltr';

  // constructor
  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeLayoutService
  ) {
    effect(() => {
      this.isRtlTheme(this.themeService.directionChange());
    });
  }

  // private method
  private isRtlTheme(direction: string) {
    this.direction = direction;
  }

  // life cycle event
  ngOnInit() {
    this.breakpointObserver.observe([MIN_WIDTH_1025PX, MAX_WIDTH_1024PX]).subscribe((result) => {
      if (result.breakpoints['(max-width: 1024.98px)']) {
        this.modeValue = 'over';
        (document.querySelector('#nav-ps-able-pro') as HTMLElement).style.height = 'calc(100vh - 163px)';
      } else if (result.breakpoints[MIN_WIDTH_1025PX]) {
        this.modeValue = 'side';
        this.menuSide?.open();
      }
    });

    this.themeService.componentMenuState.subscribe(() => {
      this.menuSide.toggle();
    });
  }

  // public method
  toggleMenu() {
    this.themeService.toggleMenuSide();
  }
}
