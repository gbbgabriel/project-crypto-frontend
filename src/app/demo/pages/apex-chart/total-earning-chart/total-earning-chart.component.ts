// angular import
import { Component, Input, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
import { NgApexchartsModule, ChartComponent, ApexFill, ApexChart, ApexStroke, ApexPlotOptions, ApexAxisChartSeries } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  color: [];
};

@Component({
  selector: 'app-total-earning-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './total-earning-chart.component.html',
  styleUrl: './total-earning-chart.component.scss'
})
export class TotalEarningChartComponent implements OnInit {
  // public props
  chartOptions: Partial<ChartComponent>;
  @Input() color: [];
  @Input() background: string;
  @Input() valueColor: string;

  // life cycle event
  ngOnInit() {
    this.chartOptions = {
      series: [30],
      chart: {
        height: 150,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '60%',
            background: 'transparent',
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front'
          },
          track: {
            background: this.background,
            strokeWidth: '50%'
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              formatter: function (val) {
                return val + '%';
              },
              offsetY: 7,
              color: this.valueColor,
              fontSize: '20px',
              fontWeight: '700',
              show: true
            }
          }
        }
      },
      colors: this.color,
      fill: {
        type: 'solid'
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }
}
