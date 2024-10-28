import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, effect, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';
import { BuyNowLinkService } from 'src/app/@theme/services/buy-now-link.service';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';
import { AbleProConfig } from 'src/app/app-config';
import { SharedModule } from 'src/app/demo/shared/shared.module';

interface User {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  templateUrl: './toolbar-right.component.html',
  styleUrls: ['./toolbar-right.component.scss']
})
export class NavRightComponent implements OnInit {
  @Output() HeaderBlur = new EventEmitter();
  direction = 'ltr';

  // Propriedades para o usuário atual
  currentUser: User | null = null;

  constructor(
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private themeService: ThemeLayoutService,
    public buyNowLinkService: BuyNowLinkService
  ) {
    this.translate.setDefaultLang(AbleProConfig.i18n);
    effect(() => {
      this.isRtlTheme(this.themeService.directionChange());
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  private isRtlTheme(direction: string) {
    this.direction = direction;
  }

  headerBlur() {
    this.HeaderBlur.emit();
  }

  logout() {
    this.authenticationService.logout();
  }
}
