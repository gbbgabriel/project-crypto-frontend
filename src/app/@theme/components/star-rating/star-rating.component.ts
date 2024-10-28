// Angular Import
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

// Project Import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 2;
  @Input() starCount: number = 5;
  @Output() ratingUpdated = new EventEmitter();

  // eslint-disable-next-line
  ratingArr: any = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    for (let i = 0; i < this.starCount; i++) {
      this.ratingArr.push(i);
    }
  }
  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
