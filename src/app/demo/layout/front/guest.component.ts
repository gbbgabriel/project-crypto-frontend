// angular import
import { Component } from '@angular/core';

// project import
import { BuyNowLinkService } from 'src/app/@theme/services/buy-now-link.service';
import { techData } from '../../data/tech-data';

// type
import { TechSection } from 'src/app/@theme/types/tech-data-type';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {
  // public props
  navDataShow!: boolean;
  dropDownIcon: string = 'custom-arrowDown2';
  drpTechBlock: TechSection[] = techData;

  // constructor
  constructor(public buyNowLinkService: BuyNowLinkService) {}

  // public methods
  open(item: TechSection) {
    window.open(window.location.href.replace(window.location.search, '') + item.url + this.buyNowLinkService.queryString, '_blank');
  }
  openDashboard() {
    window.open(
      window.location.href.replace(window.location.href, '') + 'dashboard/default' + this.buyNowLinkService.queryString,
      '_blank'
    );
  }
  toggleIcon(): void {
    this.dropDownIcon = 'custom-arrowUp2';
  }
  resetIcon(): void {
    this.dropDownIcon = 'custom-arrowDown2';
  }
}
