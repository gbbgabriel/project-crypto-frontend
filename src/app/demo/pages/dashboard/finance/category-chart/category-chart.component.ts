// angular import
import { Component } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
import { ApexChart, ApexDataLabels, NgApexchartsModule, ApexNonAxisChartSeries, ApexLegend, ApexPlotOptions } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  labels: string[];
};

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './category-chart.component.html',
  styleUrl: './category-chart.component.scss'
})
export class CategoryChartComponent {
  chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      chart: {
        height: 300,
        type: 'donut'
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%'
          }
        }
      },
      labels: ['Saving', 'Spend', 'Income'],
      series: [25, 50, 25],
      colors: ['#4680ff', '#dc2626', '#673ab7']
    };
  }
}
