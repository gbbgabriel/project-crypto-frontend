// angular import
import { Component, Input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

// third party
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  colors: string[];
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-support-bar-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule, CommonModule],
  templateUrl: './support-bar-chart.component.html',
  styleUrl: './support-bar-chart.component.scss'
})
export class SupportBarChartComponent implements OnInit {
  // public props
  chartOptions!: Partial<ChartOptions>;
  themeRTL!: string;

  @Input() value!: number;
  @Input() typeRequest!: string;
  @Input() inputColor!: string;
  @Input() backgroundColor!: string;
  @Input() openValue!: number;
  @Input() runningValue!: number;
  @Input() solvedValue!: number;
  @Input() chartColor!: string[];

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkMode());
    });
    effect(() => {
      this.themeDirection(this.themeService.directionChange());
    });
  }

  // life cycle hook
  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: this.chartColor,
      stroke: {
        curve: 'smooth',
        width: 2
      },
      series: [
        {
          name: 'series1',
          data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
        }
      ],
      tooltip: {
        theme: 'light',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },

        marker: {
          show: false
        }
      }
    };
  }

  private themeDirection(direction: string) {
    this.themeRTL = direction;
  }

  private isDarkTheme(isDark: string) {
    const tooltipTheme = isDark === DARK ? DARK : LIGHT;
    const tooltip = { theme: tooltipTheme };
    this.chartOptions = { ...this.chartOptions, tooltip };
  }
}
