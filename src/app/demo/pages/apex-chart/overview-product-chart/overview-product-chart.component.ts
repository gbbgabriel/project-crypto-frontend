// angular import
import { Component } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
import { NgApexchartsModule, ChartComponent, ApexChart, ApexAxisChartSeries, ApexFill, ApexResponsive, ApexLegend } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  color: [];
  labels: string[];
  fill: ApexFill;
  responsive: ApexResponsive;
  legend: ApexLegend;
};

@Component({
  selector: 'app-overview-product-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './overview-product-chart.component.html',
  styleUrl: './overview-product-chart.component.scss'
})
export class OverviewProductChartComponent {
  // public props
  chartOptions: Partial<ChartComponent>;

  // constructor
  constructor() {
    this.chartOptions = {
      chart: {
        height: 350,
        type: 'pie'
      },
      labels: ['Components', 'Widgets', 'Pages', 'Forms', 'Other', 'Apps'],
      series: [40, 20, 10, 15, 5, 10],
      colors: ['#4680FF', '#4680FF', '#212529', '#212529', '#212529', '#212529'],
      fill: {
        opacity: [1, 1, 0.4, 0.6, 0.8, 1]
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      legend: {
        show: false
      }
    };
  }

  // public method
  overView_product = [
    {
      name: 'Apps',
      value: '10+'
    },
    {
      name: 'Other',
      value: '5+'
    },
    {
      name: 'Widgets',
      value: '150+'
    },
    {
      name: 'Forms',
      value: '50+'
    },
    {
      name: 'Components',
      value: '200+'
    },
    {
      name: 'Pages',
      value: '150+'
    }
  ];
}
