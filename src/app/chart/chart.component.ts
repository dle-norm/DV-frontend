import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AppService } from '../app.service';
import { lastValueFrom } from 'rxjs';
import { dataChart } from '../interface/dataChart';
import { dataJson } from '../interface/dataJson';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  private chart: am4charts.XYChart;

  constructor (@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private service: AppService) {}

  // Run the function only in the browser
  browserOnly (f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  async ngAfterViewInit () {
    // Chart code goes in here
    this.browserOnly(async () => {
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      const data: dataChart[] = [];
      // get api/volume/250162.json to level 1
      const volumes$ = this.service.getVolumes('250162.json');
      const volumes: dataJson[] = await lastValueFrom(volumes$);
      // format the json to use amchart graph
      for (let i = 0; i < volumes.length; i++) {
        data.push({ date: volumes[i].date, name: 'name' + i, value: volumes[i].volume });
      }
      chart.data = data;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}';

      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy () {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
