import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexTitleSubtitle, ApexGrid, ApexXAxis } from 'ng-apexcharts';
import { LineOptions } from '../../interfaces/ventas';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit, OnChanges {

  @ViewChild("chart") chartLine!: ChartComponent;

  @Input() series: ApexAxisChartSeries=[{name:'any',data:[2010,2011,2013,2014,2015,2016,2015,2014,2013,2000,2001,2022]},
  {name:'any2',data:[2223,2014,2012,2011,2010,2018,2019,2020,2022,2020,2012,2019]}
];
  @Input() chart: ApexChart={height:350, type:'line',zoom:{enabled:true}};
  @Input() dataLabels: ApexDataLabels={enabled:false,};
  @Input()stroke: ApexStroke={curve:'straight'};
  @Input()title: ApexTitleSubtitle={align:'center'};
  @Input()grid: ApexGrid={row:{colors:["#f3f3f3", "transparent"],opacity:0.5}};
  @Input()xaxis: ApexXAxis={categories:['A','B','C','D','E','F','G','H','I','J','K','L']};

  public chartOptions:LineOptions={
    series:this.series,
    chart:this.chart,
    dataLabels:this.dataLabels,
    stroke:this.stroke,
    title:this.title,
    grid:this.grid,
    xaxis:this.xaxis
  }

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions.series=this.series;
    this.chartOptions.xaxis=this.xaxis;
    console.log(this.title);
    this.chartOptions.title=this.title;
  }

  ngOnInit(): void {
    
  }
  

}
