// angular import
import { Component, Input, OnInit, effect } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

// apexChart
import {
  NgApexchartsModule,
  ApexDataLabels,
  ApexLegend,
  ApexMarkers,
  ApexStroke,
  ApexFill,
  ApexGrid,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexChart,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  markers: ApexMarkers;
  stroke: ApexStroke;
  fill: ApexFill;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-statistics-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './statistics-chart.component.html',
  styleUrl: './statistics-chart.component.scss'
})
export class StatisticsChartComponent implements OnInit {
  // public props
  chartOptions!: Partial<ChartOptions>;
  selectType: string = 'today';
  chartColors = ['#faad14', '#4680ff'];
  @Input() height!: number;

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    effect(() => {
      this.updateChartColors(this.themeService.color());
    });
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkMode());
    });
  }

  // life cycle hook
  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'area',
        height: this.height,
        toolbar: {
          show: false
        }
      },
      colors: this.chartColors,
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        position: 'top'
      },
      markers: {
        size: 1,
        colors: ['#fff', '#fff', '#fff'],
        strokeColors: this.chartColors,
        strokeWidth: 1,
        shape: 'circle',
        hover: {
          size: 4
        }
      },
      stroke: {
        width: 2,
        curve: 'smooth'
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
      grid: {
        strokeDashArray: 4,
        borderColor: '#f5f5f5'
      },
      series: [
        {
          name: 'Revenue',
          data: [200, 320, 320, 275, 275, 400, 400, 300, 440, 320, 320, 275, 275, 400, 300, 440]
        },
        {
          name: 'Sales',
          data: [200, 250, 240, 300, 340, 320, 320, 400, 350, 250, 240, 300, 340, 320, 400, 350]
        }
      ],
      xaxis: {
        tooltip: {
          enabled: false
        },
        labels: {
          hideOverlappingLabels: true
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    };
  }

  // private methods
  private updateChartColors(theme: string) {
    switch (theme) {
      case 'blue-theme':
      default:
        this.chartColors = ['#faad14', '#4680ff'];
        break;
      case 'indigo-theme':
        this.chartColors = ['#faad14', '#6610f2'];
        break;
      case 'purple-theme':
        this.chartColors = ['#faad14', '#673ab7'];
        break;
      case 'pink-theme':
        this.chartColors = ['#faad14', '#e83e8c'];
        break;
      case 'red-theme':
        this.chartColors = ['#faad14', '#dc3545'];
        break;
      case 'orange-theme':
        this.chartColors = ['#faad14', '#fd7e14'];
        break;
      case 'yellow-theme':
        this.chartColors = ['#faad14', '#e58a00'];
        break;
      case 'green-theme':
        this.chartColors = ['#faad14', '#2ca87f'];
        break;
      case 'teal-theme':
        this.chartColors = ['#faad14', '#20c997'];
        break;
      case 'cyan-theme':
        this.chartColors = ['#faad14', '#3ec9d6'];
        break;
    }
    this.chartOptions.markers!.strokeColors = this.chartColors;
    this.chartOptions = { ...this.chartOptions, colors: this.chartColors };
  }

  private isDarkTheme(isDark: string) {
    const tooltipTheme = isDark === DARK ? DARK : LIGHT;
    const tooltip = { theme: tooltipTheme };
    const grid = { ...this.chartOptions.grid };
    grid.borderColor = isDark === DARK ? '#fafafa0d' : '#f5f5f5';
    this.chartOptions = { ...this.chartOptions, tooltip, grid };
  }

  // public methods
  onOptionSelected() {
    switch (this.selectType) {
      case 'today':
        this.chartOptions.series = [
          {
            name: 'Revenue',
            data: [200, 320, 320, 275, 275, 400, 400, 300, 440, 320, 320, 275, 275, 400, 300, 440]
          },
          {
            name: 'Sales',
            data: [200, 250, 240, 300, 340, 320, 320, 400, 350, 250, 240, 300, 340, 320, 400, 350]
          }
        ];
        break;
      case 'week':
        this.chartOptions.series = [
          {
            name: 'Revenue',
            data: [350, 400, 320, 340, 300, 240, 250, 350, 400, 320, 320, 340, 300, 240, 200, 440]
          },
          {
            name: 'Sales',
            data: [440, 300, 400, 275, 275, 320, 320, 440, 300, 400, 275, 275, 320, 320, 200, 300]
          }
        ];
        break;
      case 'month':
        this.chartOptions.series = [
          {
            name: 'Revenue',
            data: [200, 320, 320, 275, 275, 400, 400, 300, 440, 320, 320, 275, 275, 400, 300, 440]
          },
          {
            name: 'Sales',
            data: [200, 250, 240, 300, 340, 320, 320, 400, 350, 250, 240, 300, 340, 320, 400, 350]
          }
        ];
        break;
    }
  }
}
