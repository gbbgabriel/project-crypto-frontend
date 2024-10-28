// angular import
import { Component, effect } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// third party
import {
  ChartComponent,
  NgApexchartsModule,
  ApexFill,
  ApexDataLabels,
  ApexChart,
  ApexStroke,
  ApexPlotOptions,
  ApexGrid,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTheme
} from 'ng-apexcharts';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  color: [];
  theme: ApexTheme;
};

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss'
})
export class RevenueChartComponent {
  // public props
  chartOptions: Partial<ChartComponent>;
  monthlyColor = ['var(--primary-500)', '#8996a4'];

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    this.chartOptions = {
      chart: {
        fontFamily: 'Inter var, sans-serif',
        type: 'area',
        height: 370,
        background: 'transparent',
        toolbar: {
          show: false
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'vertical',
          inverseColors: false,
          opacityFrom: 0.2,
          opacityTo: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 4
        }
      },
      grid: {
        show: true,
        borderColor: '#F3F5F7',
        strokeDashArray: 2
      },
      series: [
        {
          name: 'Income',
          data: [20, 70, 40, 70, 70, 90, 50, 55, 45, 60, 50, 65]
        },
        {
          name: 'Expense',
          data: [10, 40, 20, 40, 50, 70, 80, 30, 15, 32, 90, 30]
        }
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      theme: {
        mode: LIGHT
      }
    };
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkMode());
    });
  }

  // private methods
  private isDarkTheme(isDark: string) {
    const theme = { ...this.chartOptions.theme };
    theme.mode = isDark === DARK ? DARK : LIGHT;
    this.chartOptions = { ...this.chartOptions, theme };
  }
}
