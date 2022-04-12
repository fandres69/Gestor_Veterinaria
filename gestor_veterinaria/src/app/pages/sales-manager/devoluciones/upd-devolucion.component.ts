import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { PedidoModel, VistaPedidos, VistaDetalle, DetalleInvModel, ViewInvResponse, DetallePedModel, DevolucionesModel } from '../interfaces/sales-interfaces';
import { ClientsGV } from '../../client-manager/interfaces/clients';
import { ciudadModel } from '../../data-master-manager/interfaces/data-master-interface';
import { Observable, map, debounceTime } from 'rxjs';
import { ProductoModel, ServiciosModel } from '../../stock-manager/interfaces/stock-manager';
import { SalesManagerServiceService } from '../services/sales-manager-service.service';
import { ActivatedRoute } from '@angular/router';
import { ClientServiceService } from '../../client-manager/services/client-service.service';
import { DataMasterService } from '../../control-panel/services/data-master.service';
import { StManagerService } from '../../stock-manager/services/st-manager.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-upd-devolucion',
  templateUrl: './upd-devolucion.component.html',
  styleUrls:['./devoluciones.css']
})
export class UpdDevolucionComponent implements OnInit {

  public pedido!:PedidoModel[];
  myControl = new FormControl();
  public criterio:string='';
  public ClientesS:ClientsGV[]=[];
  public FiltroC:ClientsGV[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedItem!:ClientsGV;
  public ciudadesL:ciudadModel[]=[];
  private salesOrdersL:PedidoModel[]=[];
  public salesFilters:PedidoModel[]=[];
  public salidaList:VistaPedidos[]=[];
  public OrderForUpd!:VistaPedidos;
  filteredOptions!: Observable<ClientsGV[]>;
  public editar:boolean=false;
  public cargaEditable:boolean=false;
  public detalleL:VistaDetalle[]=[];
  private vistaDetalleUpdate!:DevolucionesModel;

  public productosL:ProductoModel[]=[];
  public serviciosL:ServiciosModel[]=[];
  public detalleInvL:DetalleInvModel[]=[];
  public viewInvL:ViewInvResponse[]=[];
  public tipoPS='';
  public  totales={sub:0,subImpuesto:0,subDescuento:0,total:0};

  public listaDevoluciones:DevolucionesModel[]=[];
  public devolucionesPedido:DevolucionesModel[]=[];

  //Paginador
  public p_Size=5;
  public page=1;
  public optionsPage=[5,10,30,50];

  miForm=this.fb.group({
    cantidad:[1,[Validators.required,Validators.min(1)]],
    observaciones:['',[Validators.required,Validators.minLength(3)]],
  });
  
  private idPedido:number=0;
  constructor(private salesMng:SalesManagerServiceService,private aRute:ActivatedRoute, 
    private fb:FormBuilder,private clManager:ClientServiceService, private dataM:DataMasterService,
    private stManager:StManagerService
    ) { 
 
  }

  ngOnInit(): void {   
    this.loadAllClients();
    this.loadCiudades();
    this.loadProductos();
    this.loadServicios();
    this.loadDetalleInv();
    this.loadDevoluciones();
    this.loadOrders();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
   
  }

  loadOrders(){
    this.salesMng.getAllOrders().subscribe(
      res=>{
          if(res.salesOrders){
          this.salesOrdersL=res.salesOrders[0];
          this.salesOrdersL=this.salesOrdersL.sort().reverse();
          this.loadPedido();
          return;
        }
      }
    )
  }

  /**Carga las devoluciones de la DB */
  loadDevoluciones(){
    this.salesMng.getAllDevoluciones().subscribe(
      res=>{
          if(res.devoluciones){
          this.listaDevoluciones=res.devoluciones[0];
          this.listaDevoluciones=this.listaDevoluciones.sort().reverse();
          return;
        }
      }
    )
  }

  loadPedido(){
    if(this.idPedido && this.idPedido >0){
      this.pedido=this.salesOrdersL.filter(x=>x.idpedidos===this.idPedido);  
      this.generateVPedido();
    }
  }
/**Consulta la base de datos con el criterio de búsqueda */
private _filter(value: string): ClientsGV[] {
  
  debounceTime(200);   
  if(this.criterio!=''){     
    const filterValue = value.toString().toLowerCase();      
    this.FiltroC= this.ClientesS.filter(x => x.documento?.toString().toLowerCase().includes(filterValue));
    if(this.FiltroC.length===0){
      this.FiltroC=[{nombre:'No hay coincidencias'}]
    }
   
  }else{
    this.FiltroC=[{nombre:'No hay coincidencias'}]
  }
  return this.FiltroC;
}

/**Carga los productos */
loadProductos(){
  this.stManager.getAllProducts().subscribe(resp=>{
    if(resp.productos){
      this.productosL=resp.productos[0];
    }
  });
}

/**Carga los servicios */
loadServicios(){
  this.stManager.getAllServicios().subscribe(resp=>{
    if(resp.servicios){
      this.serviciosL=resp.servicios[0];
    }
  });
}


selectForQuery(objeto:ClientsGV){
  this.forQuery=true;
  localStorage.setItem('search',JSON.stringify(objeto));   
  this.selectedItem=JSON.parse(localStorage.getItem('search')||'');  
  this.salesFilters=this.salesOrdersL.filter(x=>x.cliente===this.selectedItem.documento);
  this.salidaList=[];
  if(this.salesFilters.length>0){
    this.salesFilters.forEach(element => {
      let mes=(element.mes||1)-1;
      const date=new Date(element.anio||1900,mes,element.dia||1);   
      const city:ciudadModel[]=this.ciudadesL.filter(x=>x.codigo===element.ciudad);
      const stockF={
      idpedidos:element.idpedidos,
      documento:this.selectedItem.documento||0,
      nombre:this.selectedItem.nombre||'',
      direccionEntrega:element.direccionEntrega||'',
      ciudad:element.ciudad||'',
      ciudadN:city[0].Ciudad||'',
      observaciones:element.observaciones||'',
      fecha:date
     }
      this.salidaList.push(stockF);
    });
  }
}

/**Limpia el formulario */
limpiarInfo(){
  this.selectedItem={};
  this.forLoad=false;
  this.forQuery=false;
  localStorage.removeItem('search');
  this.miForm.reset();
  this.editar=false;
  this.salesMng.clearDetalle(); 
  this.totales={sub:0,subImpuesto:0,subDescuento:0,total:0};
}

/**Obtienen listado de clientes */
loadAllClients(){
  this.clManager.getAllClients().subscribe(
    res=>{
      if(res.clientes){
        this.ClientesS=res.clientes[0];
        return;
      }
    }
  )
}

loadInfo(){    
  if(!this.forQuery){
    Swal.fire({
      text: "No has seleccionado un cliente aun",
      icon: 'warning',
    });
    return;
  }
  this.selectedItem=JSON.parse(localStorage.getItem('search')||'');      
  this.forLoad=true;   
}  

generateVPedido(){
  this.salesFilters=this.salesOrdersL.filter(x=>x.idpedidos===this.pedido[0].idpedidos);
  const cli=this.ClientesS.filter(x=>x.documento===this.pedido[0].cliente);
  this.selectedItem=cli[0];
  if(this.salesFilters.length>0){
    this.salesFilters.forEach(element => {
      let mes=((element.mes)?element.mes:1)-1;
      const date=new Date(element.anio||1900,mes,element.dia||1);   
      const city:ciudadModel[]=this.ciudadesL.filter(x=>x.codigo===element.ciudad);
      const stockF={
      idpedidos:element.idpedidos,
      documento:this.selectedItem.documento||0,
      nombre:this.selectedItem.nombre||'',
      direccionEntrega:element.direccionEntrega||'',
      ciudad:element.ciudad||'',
      ciudadN:city[0].Ciudad||'',
      observaciones:element.observaciones||'',
      fecha:date
     }
      this.salidaList.push(stockF);
    });
  }
  this.loadForUpdate(this.salidaList[0]);

}

loadOrderDetail(pedido:number){
this.devolucionesPedido=this.listaDevoluciones.filter(x=>x.pedido===pedido);
// this.salesMng.loadDetallesByOrden(pedido).subscribe(resp=>{
//   if(resp.OrderDetail){
//     const detallesDb:DetallePedModel[]=resp.OrderDetail[0];
//     detallesDb.forEach(element => {

//       let productoN=this.productosL.filter(x=>x.idProductos===element.producto);
//       let subTotal=(element.precio||0) *( element.cantidad||0);
//       let subTotalImpuesto=((element.precio||0) *( (element.impuesto||0)/100))*(element.cantidad||0);
//       let subTotalDescuento=((element.precio||0) *( (element.descuento||0)/100))*(element.cantidad||0);
//       const vDetalle:VistaDetalle={
//         iddetallePedido:element.iddetallePedido,
//         producto:element.producto,       
//         productoName:productoN[0].producto,
//         cantidad:element.cantidad,
//         ciudad:element.ciudad,
//         descuento:element.descuento,
//         precio:element.precio,
//         impuesto:element.impuesto,
//         clienteDoc:element.cliente,
//         clienteName:this.selectedItem.nombre,
//         pedido:element.pedido,
//         tipoProducto:element.tipoProducto,
//         subTotal:subTotal,
//         subTotalImpuesto:subTotalImpuesto,
//         subTotalDescuento:subTotalDescuento,
//         total:(subTotal||0) +( subTotalImpuesto||0)-( subTotalDescuento||0),
//         anio:element.anio,
//         mes:element.mes,
//         dia:element.dia
//       }
//       this.salesMng.addDetalle(vDetalle);
//     });
//   }
// });

}

loadForUpdate(stock:VistaPedidos){
  this.OrderForUpd=stock;
  this.forLoad=false;   
  this.editar=true;
  this.loadOrderDetail(this.OrderForUpd.idpedidos||0);
}
/**Valida campos */
ValidaCampo(campo:string){
  return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
}

editable(){
  this.cargaEditable=true;   
}
closeEditable(){
  this.cargaEditable=false;   
}
cancelar(){
  this.editar=false; 
  this.criterio='';
  this.miForm.reset();
  this.limpiarInfo();
}

/**
   * Obtiene el listado de ciudades
   */
 loadCiudades(){
  this.dataM.getAllCities().subscribe(
    res=>{
      if(res.ciudades){
        this.ciudadesL=res.ciudades[0];
        return;
      }
    }
  )
}

/**carga los datos de la vista de productos */
loadDetalleInv(){
  this.salesMng.viewInventario().subscribe(
    res=>{
      if(res.detalleInv){
        this.detalleInvL=res.detalleInv[0];
        return;
      }
    }
  )
}
/**Evento para el Paginador */
pageEvent(e:PageEvent){
  this.p_Size=e.pageSize;
  this.page=e.pageIndex+1;
}


  //Paginador2
  public pSize=5;
  public pageD=1;
  public optionsPageD=[5,10,30,50];
  /**Evento para el Paginador */
  pageEventD(e:PageEvent){
    this.pSize=e.pageSize;
    this.pageD=e.pageIndex+1;
  }



/**Define el tipo de producto como servicio P */
tipoP(){
  this.tipoPS='P';
}
/**Define el tipo de producto como servicio S */
tipoS(){
  this.tipoPS='S'
}

/**Agrega un detalle en la lista de detalles a crear */
agregarDetalle(){

  let producto:number;
  const detalle_:VistaDetalle={};
  if(this.tipoPS==='P'){
    producto =this.miForm.get('productoD')?.value;  
    const inv=this.detalleInvL.filter(x=>x.idProductos==producto);
    detalle_.productoName=inv[0].producto;
    detalle_.precio=inv[0].PrecioVenta;
    detalle_.impuesto=inv[0].impuesto;
    detalle_.producto=producto;
    detalle_.descuento=inv[0].descuento;
  }else if (this.tipoPS==='S') {
    producto =this.miForm.get('servicioD')?.value;
    const inv=this.serviciosL.filter(x=>x.idServicios==producto);
    detalle_.productoName=inv[0].servicio;
    detalle_.precio=inv[0].precio;
    detalle_.impuesto=inv[0].impuesto;
    detalle_.producto=producto;
    detalle_.descuento=inv[0].descuento;
  }
  const fecha=this.OrderForUpd.fecha;
  detalle_.cantidad=this.miForm.get('cantidad')?.value;
  detalle_.clienteDoc=this.OrderForUpd.documento;
  detalle_.clienteName=this.OrderForUpd.nombre;
  detalle_.ciudad=this.OrderForUpd.ciudad;
  detalle_.ciudadName=this.OrderForUpd.ciudadN;
  detalle_.pedido=this.OrderForUpd.idpedidos;
  detalle_.tipoProducto=this.tipoPS;
  detalle_.subTotal=(detalle_.precio||0) *( detalle_.cantidad||0);
  detalle_.subTotalImpuesto=((detalle_.precio||0) *( (detalle_.impuesto||0)/100))*(detalle_.cantidad||0);
  detalle_.subTotalDescuento=((detalle_.precio||0) *( (detalle_.descuento||0)/100))*(detalle_.cantidad||0);
  detalle_.total=(detalle_.subTotal||0) +( detalle_.subTotalImpuesto||0)-( detalle_.subTotalDescuento||0);
  detalle_.anio=fecha.getFullYear();
  let mes=(fecha.getMonth()||1);
  detalle_.mes=mes+1;
  detalle_.dia=fecha.getDate();
  this.salesMng.addDetalle(detalle_);
  this.miForm.get('cantidad')?.setValue(1);
   
}

selectUpdate(objecto:DevolucionesModel){
  this.vistaDetalleUpdate=objecto;
  this.miForm.get('cantidad')?.setValue(this.vistaDetalleUpdate.cantidad);
  this.miForm.get('observaciones')?.setValue(this.vistaDetalleUpdate.observaciones);
}




/**Carga el litado de detalles en la DB */
updateDevolucion(){

  if(this.miForm.invalid){
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'Hay cosas por corregir',
    }).then(r=>{
      this.miForm.markAllAsTouched();
    });
    return;
  }

  this.vistaDetalleUpdate.cantidad=this.miForm.get('cantidad')?.value;
  this.vistaDetalleUpdate.observaciones=this.miForm.get('observaciones')?.value;

  this.salesMng.updateDevolucion(this.vistaDetalleUpdate).subscribe(resp=>{
    if(resp.error){
      const msg=resp.error.errors[0].msg;
      const param=resp.error.errors[0].param||'';
      Swal.fire({
        icon: 'error',
        title: 'Oops...'+param,
        text: msg,
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Actualización correcta',
      text:  resp.statusDescription,
    }).then(r=>{        
      this.forLoad=false;
      this.criterio='';
      this.vistaDetalleUpdate={};
      this.limpiarInfo();
    }
    )
  })
}

}
