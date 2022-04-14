import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartComponent, ApexChart, ApexResponsive, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { DonutOptions } from '../../interfaces/ventas';

@Component({
  selector: 'app-pastel',
  templateUrl: './pastel.component.html',
  styleUrls: ['./pastel.component.css']
})
export class PastelComponent implements OnInit, OnChanges {

  @Input()series:ApexNonAxisChartSeries=[];
  @Input() chart: ApexChart={type:'donut',zoom:{enabled:true},stacked:true};
  @Input() responsive: ApexResponsive[]=[];
  @Input() labels:string[]=[];
  @Input() title:ApexTitleSubtitle={text:'Gráfica',align:'center'};

  @ViewChild("chart") chartDonut!: ChartComponent;

  public chartOptions:DonutOptions= {
    series:this.series,   
    chart:this.chart,
    labels:this.labels,
    responsive:this.responsive,
    title:this.title
  };

  constructor() {
    this.chartOptions={
      series:[25,16,35,24],
      chart:this.chart,      
      labels:['producto A','producto B','producto C','producto D'],
      responsive:[{
        breakpoint:300,
        options:{
          chart:{
            width:100,
            zoom:{enabled:true},
            toolbar:{show:true}
          },
          legend:{
            position:'button'
          }
        }
      }],
      title:{text:'pruebas'},
    };
   }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions.series=this.series;
    this.chartOptions.labels=this.labels;
    this.chartOptions.title=this.title;
  }

}
