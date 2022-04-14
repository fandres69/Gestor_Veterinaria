import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { ChartOptions } from '../../interfaces/ventas';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.css']
})
export class BarrasComponent implements OnInit ,OnChanges {

  @Input()series:ApexAxisChartSeries=[]; 
  @Input() chart: ApexChart={type:'bar',zoom:{enabled:true}};
  @Input() xaxis: ApexXAxis={};
  @Input() title: ApexTitleSubtitle={};


  @ViewChild("chart") chartG!:ChartComponent;

  public chartOptions:ChartOptions= {
    series:this.series,   
    chart:this.chart,
    title: this.title,
    xaxis:this.xaxis
  };
  constructor() {
   
  }
 
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions={
      series:this.series,   
      chart:this.chart,
      title: this.title,
      xaxis:this.xaxis
    }
  }



}
