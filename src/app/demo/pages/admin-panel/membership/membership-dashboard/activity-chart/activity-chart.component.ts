// angular import
import { Component, OnInit, effect } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

// apexChart
import {
  NgApexchartsModule,
  ApexStroke,
  ApexGrid,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexMarkers,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  stroke: ApexStroke;
  grid: ApexGrid;
  markers: ApexMarkers;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-activity-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.scss'
})
export class ActivityChartComponent implements OnInit {
  // public props
  chartOptions!: Partial<ChartOptions>;
  selectType: string = 'today';

  // constructor
  constructor(private themeService: ThemeLayoutService) {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkMode());
    });
  }

  // life cycle hook
  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 150,
        toolbar: {
          show: false
        }
      },
      colors: ['#52c41a', '#52c41a'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        position: 'top'
      },
      markers: {
        size: 1,
        colors: ['#fff', '#fff'],
        strokeColors: ['#52c41a', '#52c41a'],
        strokeWidth: 1,
        shape: 'circle',
        hover: {
          size: 4
        }
      },
      fill: {
        opacity: [1, 0.3]
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      grid: {
        show: false
      },
      series: [
        {
          name: 'Active',
          data: [20, 90, 65, 85, 20, 80, 30]
        },
        {
          name: 'Inactive',
          data: [70, 30, 40, 15, 60, 40, 95]
        }
      ],
      xaxis: {
        labels: {
          hideOverlappingLabels: true
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      tooltip: {
        theme: 'light'
      }
    };
  }

  // private methods
  private isDarkTheme(isDark: string) {
    const tooltipTheme = isDark === DARK ? DARK : LIGHT;
    const tooltip = { theme: tooltipTheme };
    this.chartOptions = { ...this.chartOptions, tooltip };
  }

  // public methods
  onOptionSelected() {
    switch (this.selectType) {
      case 'today':
        this.chartOptions.series = [
          {
            name: 'Active',
            data: [20, 90, 65, 85, 20, 80, 30]
          },
          {
            name: 'Inactive',
            data: [70, 30, 40, 15, 60, 40, 95]
          }
        ];
        break;
      case 'month':
        this.chartOptions.series = [
          {
            name: 'Active',
            data: [70, 30, 40, 15, 60, 40, 95]
          },
          {
            name: 'Inactive',
            data: [20, 90, 65, 85, 20, 80, 30]
          }
        ];
        break;
      case 'week':
        this.chartOptions.series = [
          {
            name: 'Active',
            data: [20, 90, 15, 60, 40, 80, 30]
          },
          {
            name: 'Inactive',
            data: [70, 20, 90, 65, 60, 40, 95]
          }
        ];
        break;
    }
  }
}
