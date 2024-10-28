// angular project
import { Component, OnInit, Input, effect } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

// third party
import { NgApexchartsModule, ApexStroke, ApexDataLabels, ApexAxisChartSeries, ApexYAxis, ApexChart, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-total-revenue-line-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './total-revenue-line-chart.component.html',
  styleUrl: './total-revenue-line-chart.component.scss'
})
export class TotalRevenueLineChartComponent implements OnInit {
  // public props
  chartOptions!: Partial<ChartOptions>;
  @Input() values!: [];
  @Input() color!: string[];

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkMode());
    });
  }

  // life cycle
  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 60,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: this.color,
      stroke: {
        curve: 'straight',
        lineCap: 'round',
        width: 3
      },
      series: [
        {
          name: 'series1',
          data: this.values
        }
      ],
      yaxis: {
        min: 0,
        max: 30
      },
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

  private isDarkTheme(isDarkMode: string) {
    const tooltip = { ...this.chartOptions.tooltip };
    tooltip.theme = isDarkMode === DARK ? DARK : LIGHT;
    this.chartOptions = { ...this.chartOptions, tooltip };
  }
}
