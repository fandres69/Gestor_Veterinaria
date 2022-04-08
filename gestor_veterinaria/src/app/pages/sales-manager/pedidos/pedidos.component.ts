import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, map, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { ClientsGV } from '../../client-manager/interfaces/clients';
import { ClientServiceService } from '../../client-manager/services/client-service.service';
import { ciudadModel } from '../../data-master-manager/interfaces/data-master-interface';
import { DataMasterService } from '../../control-panel/services/data-master.service';
import { PedidoModel } from '../interfaces/sales-interfaces';
import { SalesManagerServiceService } from '../services/sales-manager-service.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css' ]
})
export class PedidosComponent implements OnInit {

  myControl = new FormControl();
  public criterio:string='';
  public ClientesS:ClientsGV[]=[];
  public FiltroC:ClientsGV[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedItem!:ClientsGV;
  public ciudadesL:ciudadModel[]=[];

  filteredOptions!: Observable<ClientsGV[]>;
  public editar:boolean=false;

  miForm=this.fb.group({
    cliente:[,[Validators.required]],
    direccionEntrega:['',[Validators.required,Validators.minLength(3)]],
    ciudad:[0,[Validators.required]],
    observaciones:[''],
    fecha:[,[Validators.required]]  
    
  })

  constructor(private fb:FormBuilder,private salesMng: SalesManagerServiceService,
    private dataM:DataMasterService,private clManager:ClientServiceService) { }


  ngOnInit(): void {
    this.loadCiudades();
    this.loadAllClients();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
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
    this.miForm.get('direccionEntrega')?.setValue(this.selectedItem.direccion);
    this.miForm.get('ciudad')?.setValue(this.selectedItem.ciudad);
    this.miForm.get('cliente')?.setValue(this.selectedItem.documento);
    const fecha= new Date();
    this.miForm.get('fecha')?.setValue(fecha);
    this.miForm.enable();
    this.miForm.get('cliente')?.disable();
    this.forLoad=true;   
    this.editar=true;
  }  

  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

  editable(){
    this.editar=true;   
    this.miForm.enable(); 
  }
  cancelar(){
    this.editar=false; 
    this.criterio='';
    this.miForm.reset();
    this.limpiarInfo();
  }

  createPedido(){
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

    const fecha=new Date(this.miForm.get('fecha')?.value);
    let month=parseInt(fecha.getMonth().toString())+1;
   
    const body:PedidoModel={   
      cliente:this.selectedItem.documento,
      direccionEntrega:this.miForm.get('direccionEntrega')?.value,
      ciudad:this.miForm.get('ciudad')?.value,
      observaciones:this.miForm.get('observaciones')?.value||'',      
      dia:fecha.getDate(),
      mes:month,
      anio:fecha.getFullYear()
    }
  
    this.salesMng.CreateOrder(body).subscribe(resp=>{
      if(resp.error){
        const msg=resp.error.errors[0].msg;
        const param=resp.error.errors[0].param ||'';
        Swal.fire({
          icon: 'error',
          title: 'Oops...'+param,
          text: msg,
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Creación correcta',
        text:  resp.statusDescription,
      }).then(r=>{        
       this.miForm.reset();
       this.limpiarInfo();
      }
      )
    });
  }
}
