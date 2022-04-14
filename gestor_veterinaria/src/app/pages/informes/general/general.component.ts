import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AniosV, dataSetDetail, VentasModel, FiltroProduct, ChartOptions } from '../interfaces/ventas';
import { VentasServiceService } from '../services/ventas-service.service';

import { ApexNonAxisChartSeries, ApexAxisChartSeries, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { environment } from '../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  private ValAnio=environment.anio;
  miForm=this.fb.group({
    anio:[this.ValAnio],

  });

  public VentasL:VentasModel[]=[];
  public aniosVentasL:AniosV[]=[];

  public yearList:number[]=[];
  public ventasVList:VentasModel[]=[];
  public yearS:number=0;

  public labelsTag:string[]=[]
  public dataset={};
  public data:number[]=[];

  public cOPtios:ChartOptions={
    series:[{
      name:'Ventas en general',
      data:this.data
    }],
    chart:{
      height:300,
      type:'bar'
    },
    title:{
      text:`Ventas en general año ${(this.yearS>0)?this.yearS:'Todos'}`
    },
    xaxis:{
      categories:this.labelsTag||['Ventas']
    }
  };
  
  public p_Size=25;
  public page=1;
  public optionsPage=[25,50,100,150];


  public titleGLOne:ApexTitleSubtitle={text:`Ventas totales por mes año: ${(this.yearS>0)?this.yearS:'Todos'}`,align:'center'};
  public lineSerie:ApexAxisChartSeries=[{name:'any',data:[2010,2011,2013,2014,2015,2016,2015,2014,2013,2000,2001,2022]}];
  public lineAxixs:ApexXAxis={categories:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']}
  

  constructor(private dashService:VentasServiceService, private fb:FormBuilder) { }

  
  ngOnInit(): void {
    this.loadAllVentas();
    this.loadYears();
    this.ventasVList=this.VentasL;
    this.filtro();
    
  }

    /**Evento para el Paginador */
    pageEvent(e:PageEvent){
      this.p_Size=e.pageSize;
      this.page=e.pageIndex+1;
    }
  
  

  /**Carga las ventas */
  loadAllVentas(){
    this.dashService.getAllVentas().subscribe(resp=>{
      if(resp.ventas){
        this.VentasL=resp.ventas;
        this.ventasVList=this.VentasL;
        this.InfoGraph();
        this.infoGraphLine();
        this.infoProductosMes();
      }
    })
  }
  /**Carga los años de venta */
  loadYears(){
    this.dashService.getAllYears().subscribe(resp=>{
      if(resp.anios){
        this.aniosVentasL=resp.anios;
        this.aniosVentasL.forEach(yy => {
          this.yearList.push(yy.anio);
        });
      }
      this.yearList=this.yearList.sort().reverse();
    })
  }

  /**Filtra la información por año */
  filtro(){
    this.labelsTag=[];
    this.porcentual=[];
    this.data=[];
    this.yearS=parseInt(this.miForm.get('anio')?.value);
    if(this.yearS===0){
      this.ventasVList=this.VentasL;
    }else{
      this.ventasVList=this.VentasL.filter(x=>x.anio===parseInt(this.miForm.get('anio')?.value));
    }
    this.InfoGraph(); 
    this.infoGraphLine();
    this.infoProductosMes();
  }

  //#region Gráficos
  public porcentual:ApexNonAxisChartSeries=[];
  public titlePie:ApexTitleSubtitle={text:`% ventas por año ${(this.yearS>0)?this.yearS:'Todos'}`,align:'center'};
  
  /**Genera datos gráfica Pie */
  InfoGraph(){
    const productos:FiltroProduct[]=[];
    this.ventasVList.forEach(element => {
      let sum=0;
      const filtro= productos.filter(x=>x.producto===element.producto);
      if(filtro.length===0){
        let listado=this.ventasVList.filter(x=>x.producto===element.producto);
        if(listado.length>0){
          listado.forEach(val => {
            sum+=val.Total||0;
          });
          productos.push({producto:element.producto,total:sum});
          this.labelsTag.push(element.producto||'');
          this.data.push(sum);
          this.porcentual.push(sum);
        }
        
      }       
    });
    this.dataset={
    data:this.data,
    label:'Ventas productos y servicios'}

    this.cOPtios={
      series:[{
        name:'Ventas productos y servicios',
        data:this.data
      }],
      chart:{
        height:300,
        type:'bar',
      
      },
      title:{
        text:`Ventas productos y servicios año ${(this.yearS>0)?this.yearS:'Todos'}`
      },
      xaxis:{
        categories:this.labelsTag||['productos y servicios']
      }
    
    };
   

  }

  /**Gráfica lineas ventas total mes */
  infoGraphLine(){
    this.lineSerie=[];
    let datFiltro:VentasModel[]=[];
    if(this.yearS===0){
        let yYears=this.yearList;       
        yYears.sort().forEach(anio_ => {
        const dataTotal:number[]=[];
        let sum=0;
        datFiltro = this.VentasL.filter(x=> x.anio===anio_);
        for (let i = 0; i < 12; i++) {
          sum=0;
          const dt=datFiltro.filter(x=>x.mes===i);
          if(dt.length>0){
            dt.forEach(element => {
              sum+=element.Total||0;    
            }); 
          }         
          dataTotal.push(sum);
        }       
        let name=anio_.toString();
        this.lineSerie.push({name:name, data:dataTotal});
      });

    }else if(this.yearS>0){
      const dataTotal:number[]=[];
      datFiltro = this.VentasL.filter(x=>x.anio===this.yearS);
      for (let i = 0; i < 12; i++) {
         let sum=0;
         
         const dt=datFiltro.filter(x=>x.mes===i);
        if(dt.length>0){
          dt.forEach(element => {
            sum+=element.Total||0;  
          }); 
        }
       
        dataTotal.push(sum);
      }
      let name=this.yearS.toString();
      this.lineSerie.push({name:name, data:dataTotal});           
    }

  }

  
  public titleGLT:ApexTitleSubtitle={text:`Ventas totales por productos y servicios año: ${(this.yearS>0)?this.yearS:'Todos'}`,align:'center'};
  public lineSerieT:ApexAxisChartSeries=[{name:'any',data:[2010,2011,2013,2014,2015,2016,2015,2014,2013,2000,2001,2022]}];
  public lineAxixsT:ApexXAxis={categories:this.lineAxixs.categories};

  infoProductosMes(){
    this.lineSerieT=[];
    let datFiltro:VentasModel[]=[];
    const productos_:string[]=[];

    if(this.yearS===0){
       let prod=this.ventasVList;
       
     
       prod.forEach(element => {
        let nomPro=element.producto||'';
        let existe=productos_.filter(x=>x===nomPro);
        if(existe.length===0){
          productos_.push(nomPro);
        }
      });
      let yYears=this.yearList; 
      productos_.forEach(product => {
        const dataTotal:number[]=[];
               
          yYears.sort().forEach(anio_ => {
         
          let sum=0;
          datFiltro = this.VentasL.filter(x=> x.anio===anio_ && x.producto=== product);
        
          if(datFiltro.length>0){
            datFiltro.forEach(dAnio => {
                sum+=dAnio.Total||0;
            });
          }
          dataTotal.push(sum);       
         
        });
        let name=product.toString();
        this.lineSerieT.push({name:name, data:dataTotal});
        
      });
      this.lineAxixsT={categories:yYears};

    }else if(this.yearS>0){
      
     
      datFiltro = this.VentasL.filter(x=>x.anio===this.yearS);
      datFiltro.forEach(element => {
        let nomPro=element.producto||'';
        let existe=productos_.filter(x=>x===nomPro);
        if(existe.length===0){
          productos_.push(nomPro);
        }
      });
      productos_.forEach(product => {
        const dataTotal:number[]=[];
        for (let i = 0; i < 12; i++) {
          let sum=0;
          
          const dt=datFiltro.filter(x=>x.mes===i && x.producto===product);
         if(dt.length>0){
           dt.forEach(element => {
             sum+=element.Total||0;  
           }); 
         }
        
         dataTotal.push(sum);
       }
       let name=product.toString();
       this.lineSerieT.push({name:name, data:dataTotal}); 
      });
      this.lineAxixsT={categories:this.lineAxixs.categories};          
    }
    console.log(this.lineSerieT);
  }

//#endregion
}
