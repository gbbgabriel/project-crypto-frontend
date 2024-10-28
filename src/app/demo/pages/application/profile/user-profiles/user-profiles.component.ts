// angular import
import { Component, OnInit } from '@angular/core';

// third party
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ApexFill, ApexStroke, ApexAxisChartSeries } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart | undefined;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  stroke: ApexStroke;
};

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.scss']
})
export class UserProfilesComponent implements OnInit {
  // public props
  totalEarningChart: Partial<ChartOptions>;
  currentTabs = 'personal';

  // life cycle event
  ngOnInit(): void {
    this.totalEarningChart = {
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
            background: 'var(--primary-200)',
            strokeWidth: '50%'
          },

          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              offsetY: 7,
              color: 'var(--primary-500)',
              fontSize: '20px',
              fontWeight: '700',
              show: true
            }
          }
        }
      },
      colors: ['var(--primary-500)'],
      fill: {
        type: 'solid'
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }
}
