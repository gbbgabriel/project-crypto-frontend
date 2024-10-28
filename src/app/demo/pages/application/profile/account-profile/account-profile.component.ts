import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.scss'
})
export class AccountProfileComponent implements OnInit {
  // public props
  //eslint-disable-next-line
  navLinks: any[];
  activeLinkIndex = -1;

  // constructor
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Profile',
        link: '/application/profile/account/profile',
        icon: 'ti ti-user',
        index: 0
      },
      {
        label: 'Personal Details',
        link: '/application/profile/account/personal',
        icon: 'ti ti-file-text',
        index: 1
      },
      {
        label: 'My Account',
        link: '/application/profile/account/account',
        icon: 'ti ti-id',
        index: 2
      },
      {
        label: 'Change Password',
        link: '/application/profile/account/password',
        icon: 'ti ti-lock',
        index: 3
      },
      {
        label: 'Role',
        link: '/application/profile/account/role',
        icon: 'ti ti-users',
        index: 4
      },
      {
        label: 'Settings',
        link: '/application/profile/account/settings',
        icon: 'ti ti-settings',
        index: 5
      }
    ];
  }

  // life cycle
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find((tab) => tab.link === '.' + this.router.url));
    });
  }
}
