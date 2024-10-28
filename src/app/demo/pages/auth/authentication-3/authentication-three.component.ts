// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// third party
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-authentication-three',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, CarouselModule],
  templateUrl: './authentication-three.component.html',
  styleUrls: ['./authentication-three.component.scss', '../authentication.scss']
})
export class AuthenticationThreeComponent {
  // public props
  showStepper = false;
  hide = true;
  coHide = true;
  customOptions: OwlOptions = {
    loop: true,
    autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    items: 1,
    margin: 30,
    navSpeed: 700,
    nav: false,
    rtl: true,
    navText: ['', '']
  };
  email = new FormControl('', [Validators.required, Validators.email]);
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });

  // constructor
  constructor(private _formBuilder: FormBuilder) {}

  // public method
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
