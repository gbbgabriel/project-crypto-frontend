// angular import
import { Component, Input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MailData } from 'src/app/fake-data/mail';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

export interface PeriodicElement {
  images: string;
  name: string;
  text: string;
  symbol: string;
  date: string;
  promo: string;
  forums: string;
}

const ELEMENT_DATA: PeriodicElement[] = MailData;

@Component({
  selector: 'app-mail-content',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.scss']
})
export class MailContentComponent {
  // public props
  titleContent = true;
  detailsContent = false;
  @Input() star = false;
  @Input() unStar = true;
  @Input() unImportant = true;
  @Input() important = false;
  @Input() paperClip = true;
  @Input() promotion = false;
  @Input() forums = false;
  @Input() common = true;
  direction = 'ltr';

  displayedColumns: string[] = ['select', 'name', 'text', 'symbol', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    effect(() => {
      this.isRtlTheme(this.themeService.directionChange());
    });
  }

  // private methods
  private isRtlTheme(direction: string) {
    this.direction = direction;
  }

  // public method
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  detailsContentShow() {
    this.titleContent = !this.titleContent;
    this.detailsContent = !this.detailsContent;
  }

  backToMail() {
    this.detailsContent = false;
    this.titleContent = true;
  }
}
