import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClientsGV } from '../../interfaces/clients';
import { ciudadModel, tipoDocumentoModel } from '../../../data-master-manager/interfaces/data-master-interface';
import { Observable, map, debounceTime } from 'rxjs';
import { ClientServiceService } from '../../services/client-service.service';
import { DataMasterService } from '../../../control-panel/services/data-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upd-client',
  templateUrl: './upd-client.component.html',
  styles: [
  ]
})
export class UpdClientComponent implements OnInit {
  myControl = new FormControl();
  public criterio:string='';
  public clientes:ClientsGV[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedItem!:ClientsGV;
  public tipo:string='N';
  public ciudadesL!:ciudadModel[];
  public tiposDocL!:tipoDocumentoModel[];
  filteredOptions!: Observable<ClientsGV[]>;
  public editar:boolean=false;

  miForm=this.fb.group({
    documento:[,[Validators.required, Validators.min(100000)]],
    tipodocumento:[{value:1, disabled:true},[Validators.required]],
    nombre:['',[Validators.required,Validators.minLength(3)]],
    celular:[,[Validators.required,Validators.min(320500)]],
    direccion:['',[Validators.required, Validators.minLength(3)]],
    ciudad:['11001',[Validators.required]],
    email:['',[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  })


  constructor(private fb:FormBuilder,private clientS: ClientServiceService, private dataM:DataMasterService) { }

  ngOnInit(): void {
    this.limpiarInfo();
    this.loadCiudades();
    this.loadTiposDoc();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
  }

  /**Consulta la base de datos con el criterio de búsqueda */
  private _filter(value: string): ClientsGV[] {
   
    debounceTime(200);   
    if(this.criterio!=''){
      this.clientS.getClients(this.criterio, this.tipo).subscribe(resp=>{
        if(resp.error){
          this.clientes=[];
        }
        this.clientes=resp.clientes[0];
      })
     
    }
    const filterValue = value.toLowerCase();
    if(this.clientes.length===0){
      return [{nombre:'No hay coincidencias'}];
    }
    if (this.tipo==='N') {
      return this.clientes.filter(x => x.nombre?.toLowerCase().includes(filterValue))||{nombre:'No hay coincidencias'};
      
    } else {
      return this.clientes.filter(x => x.documento?.toString().toLowerCase().includes(filterValue))||{nombre:'No hay coincidencias'};
    }
  }

  limpiarInfo(){
    this.selectedItem={};
    this.forLoad=false;
    this.forQuery=false;
    localStorage.removeItem('search');
    this.miForm.reset();
    this.editar=false;
  }

  selectForQuery(objeto:ClientsGV){
    this.forQuery=true;
    localStorage.setItem('search',JSON.stringify(objeto));
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
    this.miForm.get('documento')?.setValue(this.selectedItem.documento);
    this.miForm.get('tipodocumento')?.setValue(this.selectedItem.tipodocumento);
    this.miForm.get('nombre')?.setValue(this.selectedItem.nombre);
    this.miForm.get('celular')?.setValue(this.selectedItem.celular);
    this.miForm.get('direccion')?.setValue(this.selectedItem.direccion);
    this.miForm.get('ciudad')?.setValue(this.selectedItem.ciudad);
    this.miForm.get('email')?.setValue(this.selectedItem.email);
    this.miForm.disable();
    this.forLoad=true;   
  }
  /**Obtiene el listado de tipos de documentos */
  loadTiposDoc(){
    this.dataM.getTypeDocuments().subscribe(resp=>{
      if(resp.result){
        this.tiposDocL=resp.result;
        return;
      }
    })
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

  
  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

  editable(){
    this.editar=true;
    this.miForm.enable();
  }
  cancelar(){
    this.editar=false;
    this.miForm.disable();
  }

  updateCliente(){
    if(this.miForm.invalid){
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Hay cosas por corregir',
      }).then(r=>{
        this.miForm.markAllAsTouched();
      })
    }
    const body:ClientsGV={
      documento:this.miForm.get('documento')?.value,
      tipodocumento:this.miForm.get('tipodocumento')?.value,
      nombre:this.miForm.get('nombre')?.value,
      celular:this.miForm.get('celular')?.value,
      direccion:this.miForm.get('direccion')?.value,
      ciudad:this.miForm.get('ciudad')?.value,
      email:this.miForm.get('email')?.value,
    }
    this.clientS.updClient(body).subscribe(resp=>{
      if(resp.error){
        const msg=resp.error.errors[0].msg;
        const param=resp.error.errors[0].param;
        Swal.fire({
          icon: 'error',
          title: 'Oops...'+param,
          text: msg,
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'Actualización correcta',
        text:  resp.statusDescription,
      }).then(r=>{
        this.miForm.reset();
        this.forLoad=false;
        this.criterio='';
        this.limpiarInfo();
      }
      )
    })
  }
}
