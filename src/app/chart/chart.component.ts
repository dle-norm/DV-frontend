import { Component, OnDestroy, OnInit } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AppService } from '../app.service';
import { dataChart } from '../interface/dataChart';
import { lastValueFrom } from 'rxjs';
import { dataJson } from '../interface/dataJson';
import { category, dataCategory } from '../interface/dataCategories';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnDestroy, OnInit {
  private chart: am4charts.XYChart;
  data: category[] = [];

  constructor (private service: AppService) {}

  async ngOnInit (): Promise<void> {
    // get api/volume/250162.json to level 1
    const categories$ = this.service.getCategories();
    const categories: dataCategory[] = await lastValueFrom(categories$);
    // format the json to use in a select
    for (let i = 0; i < categories.length; i++) {
      this.data.push({ value: categories[i].id, viewValue: categories[i].name });
    }
  }

  async ngAfterViewInit () {
    am4core.useTheme(am4themes_animated);
    const chart = am4core.create('chartdiv', am4charts.XYChart);

    chart.paddingRight = 20;
    chart.data = [];

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
  }

  /**
   * Set the category displayed on the graph
   * @param event
   */
  async setCategory ($event) {
    const data: dataChart[] = [];
    // get api/volume/${id}.json to level 1
    const volumes$ = this.service.getVolumes($event.value.toString());
    const volumes: dataJson[] = await lastValueFrom(volumes$);
    // format the json to use amchart graph
    for (let i = 0; i < volumes.length; i++) {
      data.push({ date: volumes[i].date, name: 'name' + i, value: volumes[i].volume });
    }
    this.chart.data = data;
  }

  ngOnDestroy () {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
