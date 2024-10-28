// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-forms-wizard',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './forms-wizard.component.html',
  styleUrls: ['./forms-wizard.component.scss']
})
export class FormsWizardComponent {
  // public props
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });

  // constructor
  constructor(private _formBuilder: FormBuilder) {}
}
