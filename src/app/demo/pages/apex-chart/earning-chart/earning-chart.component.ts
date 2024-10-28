// angular import
import { Component, Input, OnInit, effect } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// third party
import { ApexAxisChartSeries, NgApexchartsModule, ApexTheme, ApexChart, ApexPlotOptions, ApexXAxis, ApexTooltip } from 'ng-apexcharts';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  colors: string[];
  theme: ApexTheme;
};

@Component({
  selector: 'app-earning-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './earning-chart.component.html',
  styleUrl: './earning-chart.component.scss'
})
export class EarningChartComponent implements OnInit {
  // public props
  chartOptions: Partial<ChartOptions>;
  @Input() styleInput: string;
  @Input() iconImage: string;
  @Input() headerTitle: string;
  @Input() earningValue: string;
  @Input() background: string;
  @Input() textColor: string;
  @Input() percentageValue: string;
  @Input() data!: [];
  @Input() color!: [];

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkMode());
    });
  }

  // life cycle
  ngOnInit() {
    this.chartOptions = {
      chart: { type: 'bar', background: 'transparent', height: 50, sparkline: { enabled: true } },
      plotOptions: { bar: { columnWidth: '80%' } },
      series: [
        {
          data: this.data
        }
      ],
      xaxis: { crosshairs: { width: 1 } },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return '';
            }
          }
        },
        marker: { show: false },
        theme: LIGHT
      },
      colors: this.color,
      theme: {
        mode: LIGHT
      }
    };
  }

  // private methods
  private isDarkTheme(isDark: string) {
    const tooltip = { ...this.chartOptions.tooltip };
    tooltip.theme = isDark === DARK ? DARK : LIGHT;
    this.chartOptions = { ...this.chartOptions, tooltip };
  }
}
