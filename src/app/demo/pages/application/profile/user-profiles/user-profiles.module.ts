import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfilesRoutingModule } from './user-profiles-routing.module';
import { UserProfilesComponent } from './user-profiles.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TopSvgComponent } from './top-svg/top-svg.component';
import { BackSvgComponent } from './back-svg/back-svg.component';

@NgModule({
  declarations: [UserProfilesComponent],
  imports: [CommonModule, UserProfilesRoutingModule, NgApexchartsModule, SharedModule, TopSvgComponent, BackSvgComponent]
})
export class UserProfilesModule {}
