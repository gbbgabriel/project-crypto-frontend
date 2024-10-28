// angular import
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// third party
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

// project import
import { SharedModule } from '../../shared/shared.module';
import { BuyNowLinkService } from '../../../@theme/services/buy-now-link.service';
import { techData } from '../../data/tech-data';

// types
import { TechSection } from 'src/app/@theme/types/tech-data-type';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, CarouselModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  // public props
  currentSlide = 'slide-1';
  scrolledPastPoint = false;
  single: boolean;
  dropDownIcon: string = 'custom-arrowDown2';
  techDetails: TechSection[] = techData;

  // constructor
  constructor(
    private renderer: Renderer2,
    public buyNowLinkService: BuyNowLinkService,
    private router: Router
  ) {}

  // life cycle event
  ngOnInit() {
    this.renderer.addClass(document.body, 'landing-page');
    // landing page menu sticky
    let ost = 0;
    window.addEventListener('scroll', () => {
      const cOst = document.documentElement.scrollTop;
      const header = document.querySelector('.component-header') as HTMLElement;

      if (cOst === 0) {
        header.classList.add('top-header');
      } else if (cOst > ost) {
        header.classList.add('top-header');
        header.classList.remove('default');
      } else {
        header.classList.add('default');
        header.classList.remove('top-header');
      }
      ost = cOst;
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'landing-page');
  }

  open(item: TechSection): void {
    window.open(window.location.href.replace(window.location.search, '') + item.url + this.buyNowLinkService.queryString, '_blank');
  }

  openAllComponents() {
    window.open(
      window.location.href.replace(window.location.search, '') + 'components/input/button' + this.buyNowLinkService.queryString,
      '_blank'
    );
  }

  openProVersion() {
    window.open(
      window.location.href.replace(window.location.search, '') + 'dashboard/default' + this.buyNowLinkService.queryString,
      '_blank'
    );
  }

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 1,
    nav: false,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      900: {
        items: 1
      }
    }
  };

  carouselData = [
    { id: 'slide-1', img: 'assets/images/landing/Chat.png' },
    { id: 'slide-2', img: 'assets/images/landing/e-commerce.png' },
    { id: 'slide-3', img: 'assets/images/landing/mail.png' },
    { id: 'slide-4', img: 'assets/images/landing/social.png' }
  ];

  support = [
    {
      img: 'assets/images/user/avatar-1.png',
      text: '“Amazing template for fast develop.💎“',
      author: 'devbar',
      describe: 'Customizability'
    },
    {
      img: 'assets/images/user/avatar-2.png',
      text: '“Code quality is amazing. Design is astonishing. very easy to customize..😍“',
      author: 'shahabblouch',
      describe: 'Code Quality'
    },
    {
      img: 'assets/images/user/avatar-3.png',
      text: '“This has been one of my favorite admin dashboards to use. 😍“',
      author: 'htmhell',
      describe: 'Design Quality'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      text: '“Excellent support, if we need any modification, they are doing immediately“',
      author: 'hemchandkodali',
      describe: 'Customer Support'
    },
    {
      img: 'assets/images/user/avatar-5.jpg',
      text: '“For developers like me, this is the total package! 😍“',
      author: 'sumaranjum',
      describe: 'Feature Availability'
    },
    {
      img: 'assets/images/user/avatar-1.png',
      text: '“I love the looks of Able Pro 7.0. I really like the colors you guys have chosen for this theme. It looks really nice.. 💎“',
      author: 'ritelogic',
      describe: 'Other'
    },
    {
      img: 'assets/images/user/avatar-2.png',
      text: '“The author is very nice and solved my problem inmediately 😍“',
      author: 'richitela',
      describe: 'Customer Support'
    },
    {
      img: 'assets/images/user/avatar-3.png',
      text: '“Very universal admin template“',
      author: 'htmhell',
      describe: 'Design Quality'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      text: '“An amazing template. Very good design, good quality code and also very good customer support. 💎“',
      author: 'macugi',
      describe: 'Code Quality'
    },
    {
      img: 'assets/images/user/avatar-5.jpg',
      text: '“I have it running on a medium size site that is geared towards displaying stats tables and custom forms, a blog and a forum. My customers love the design and the speed in which the pages load. 😍 “',
      author: 'RizzoFrank',
      describe: 'Design Quality'
    }
  ];

  toggleIcon(): void {
    this.dropDownIcon = 'custom-arrowUp2';
  }

  resetIcon(): void {
    this.dropDownIcon = 'custom-arrowDown2';
  }
}
