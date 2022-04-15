import { ApexAxisChartSeries,ApexChart,ApexXAxis, ApexTitleSubtitle, ApexNonAxisChartSeries, ApexResponsive, ApexDataLabels, ApexGrid, ApexStroke} from 'ng-apexcharts';

export interface VentasModel {
    pedido?: number;
    detallePedido?: number;
    cliente?: number;
    nombreCliente?: string;
    codCiudad?: string;
    Ciudad?: string;
    tipoProducto?: string;
    producto?:string;
    cantidad?: number;
    precio?: number;
    descuento?: number;
    impuesto?: number;
    subTotal?: number;
    subTotalImpuesto?: number;
    subTotalDescuento?:number;
    Total?: number;
    dia?:number;
    mes?: number;
    anio?: number;
}

export interface VentasResponse{
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string,
    ventas?:VentasModel[];
}

export interface AnioResponse{
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string,
    anios?:AniosV[];
}


export interface AniosV{
    anio:number
}


export interface datasetsGraph{
    datasets?:dataSetDetail[]

}

export interface dataSetDetail{
     data: number[];
     label?: string,
     backgroundColor?:string 
}

export interface FiltroProduct{
    producto?:string;
    total?:number;
    
}


export interface FiltroCliente{
    cliente?: number;
    nombreCliente?: string;
    total?:number;
    
}

export interface ChartOptions{
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
}

export interface DonutOptions{
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    title:ApexTitleSubtitle;
}

export interface LineOptions{
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
}