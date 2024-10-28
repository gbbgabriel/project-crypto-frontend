// angular import
import { Component, effect } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// third party
import { NgApexchartsModule, ChartComponent, ApexChart, ApexAxisChartSeries, ApexTooltip, ApexStroke, ApexFill } from 'ng-apexcharts';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  color: [];
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-project-overview-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './project-overview-chart.component.html',
  styleUrl: './project-overview-chart.component.scss'
})
export class ProjectOverviewChartComponent {
  // public props
  chartOptions: Partial<ChartComponent>;
  chartOptions_1: Partial<ChartComponent>;

  // constructor
  constructor(public themeService: ThemeLayoutService) {
    this.chartOptions = {
      chart: {
        type: 'area',
        height: 60,
        stacked: true,
        sparkline: { enabled: true }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'vertical',
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0
        }
      },
      colors: ['#4680FF'],
      stroke: { curve: 'smooth', width: 2 },
      series: [{ data: [5, 25, 3, 10, 4, 50, 0] }],
      tooltip: {
        theme: LIGHT
      }
    };
    this.chartOptions_1 = {
      chart: {
        type: 'area',
        height: 60,
        stacked: true,
        sparkline: { enabled: true }
      },
      colors: ['#DC2626'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'vertical',
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0
        }
      },
      stroke: { curve: 'smooth', width: 2 },
      series: [{ data: [0, 50, 4, 10, 3, 25, 5] }],
      tooltip: {
        theme: LIGHT
      }
    };
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkMode());
    });
  }

  private isDarkTheme(isDark: string) {
    const tooltip = { ...this.chartOptions.tooltip, ...this.chartOptions_1.tooltip };
    tooltip.theme = isDark === DARK ? DARK : LIGHT;
    this.chartOptions = { ...this.chartOptions, tooltip };
    this.chartOptions_1 = { ...this.chartOptions_1, tooltip };
  }
}
