import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PedidoModel, VistaPedidos } from '../interfaces/sales-interfaces';
import { SalesManagerServiceService } from '../services/sales-manager-service.service';
import { ClientsGV } from '../../client-manager/interfaces/clients';
import { ciudadModel } from '../../data-master-manager/interfaces/data-master-interface';
import { Observable, debounceTime } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientServiceService } from '../../client-manager/services/client-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: [
  ]
})
export class DetallesComponent implements OnInit {

  private salesOrdersL:PedidoModel[]=[];
  public pedido!:PedidoModel[];
  myControl = new FormControl();
  public criterio:string='';
  public ClientesS:ClientsGV[]=[];
  public FiltroC:ClientsGV[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedItem!:ClientsGV;
  public ciudadesL:ciudadModel[]=[];
  private salesOrders:PedidoModel[]=[];
  public salesFilters:PedidoModel[]=[];
  public salidaList:VistaPedidos[]=[];
  private OrderForUpd!:VistaPedidos;
  filteredOptions!: Observable<ClientsGV[]>;
  public editar:boolean=false;

  miForm=this.fb.group({
    cliente:[,[Validators.required]],
    direccionEntrega:['',[Validators.required,Validators.minLength(3)]],
    ciudad:[0,[Validators.required]],
    observaciones:[''],
    fecha:[,[Validators.required]]  
    
  })




  
  private idPedido:number|undefined;
  constructor(private salesMng:SalesManagerServiceService,private aRute:ActivatedRoute, 
    private fb:FormBuilder,private clManager:ClientServiceService) { 
   
  }

  ngOnInit(): void {
    
   
    this.idPedido = this.salesMng.IdPedido;
    console.log(this.idPedido);
    this.loadOrders();
   
  }

  loadOrders(){
    this.salesMng.getAllOrders().subscribe(
      res=>{
        console.log(res);
        if(res.salesOrders){
          this.salesOrdersL=res.salesOrders[0];
          this.salesOrdersL=this.salesOrdersL.sort().reverse();
          this.loadPedido();
          return;
        }
      }
    )
  }

  loadPedido(){   
    
    if(this.idPedido){
      this.pedido=this.salesOrdersL.filter(x=>x.idpedidos===this.idPedido);
      console.log(this.pedido);
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

selectForQuery(objeto:ClientsGV){
  this.forQuery=true;
  localStorage.setItem('search',JSON.stringify(objeto));   
  this.selectedItem=JSON.parse(localStorage.getItem('search')||'');  
  this.salesFilters=this.salesOrders.filter(x=>x.cliente===this.selectedItem.documento);
  this.salidaList=[];
  if(this.salesFilters.length>0){
    this.salesFilters.forEach(element => {

      let mes=(element.mes)?element.mes-1:1;
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
limpiarInfo(){
  this.selectedItem={};
  this.forLoad=false;
  this.forQuery=false;
  localStorage.removeItem('search');
  this.miForm.reset();
  this.miForm.disable();
  this.editar=false;
 
}

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

loadForUpdate(stock:VistaPedidos){
  this.OrderForUpd=stock;
  this.miForm.get('direccionEntrega')?.setValue(stock.direccionEntrega);
  this.miForm.get('ciudad')?.setValue(stock.ciudad);
  console.log(stock);
  console.log(this.miForm.get('ciudad')?.value);
  this.miForm.get('cliente')?.setValue(stock.documento);
  this.miForm.get('fecha')?.setValue(stock.fecha);
  this.miForm.get('observaciones')?.setValue(stock.observaciones);
  this.miForm.disable();
  this.miForm.get('cliente')?.disable();
  this.forLoad=false;   
  this.editar=true;
}

ValidaCampo(campo:string){
  return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
}

editable(){
  this.editar=true;   
  this.miForm.disable(); 
}
cancelar(){
  this.editar=false; 
  this.criterio='';
  this.miForm.reset();
  this.limpiarInfo();
}




}
