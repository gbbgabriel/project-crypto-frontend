// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PizzaPartyComponent } from './pizza-party/pizza-party.component';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  // public props
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;

  // constructor
  constructor(private _snackBar: MatSnackBar) {}

  // public method
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openSnackBar1() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  openSnackBar2() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000
    });
  }
}
