// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { AccountProfileRoutingModule } from './account-profile-routing.module';
import { AccountProfileComponent } from './account-profile.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@NgModule({
  declarations: [AccountProfileComponent],
  imports: [CommonModule, SharedModule, AccountProfileRoutingModule]
})
export class AccountProfileModule {}
