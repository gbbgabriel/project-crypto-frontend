// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-coupon-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.scss']
})
export class CouponDialogComponent {
  selectedValue: string;

  constructor(public dialogRef: MatDialogRef<CouponDialogComponent>) {}

  onSelect(value: string): void {
    this.selectedValue = value;
    this.dialogRef.close(this.selectedValue);
  }
}
