import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClientsGV, Mascotas } from '../../interfaces/clients';
import { ciudadModel, tipoDocumentoModel } from '../../../data-master-manager/interfaces/data-master-interface';
import { Observable, map, debounceTime } from 'rxjs';
import { ClientServiceService } from '../../services/client-service.service';
import { DataMasterService } from '../../../control-panel/services/data-master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls:['./pets.component.css']
})
export class PetsComponent implements OnInit {

 
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
    propietario:[,[Validators.required]],
    nombre:['',[Validators.required,Validators.minLength(3)]],
    tipo:['',[Validators.required, Validators.minLength(3)]],
  })


  constructor(private fb:FormBuilder,private clientS: ClientServiceService, private dataM:DataMasterService) { }

  ngOnInit(): void {
    this.limpiarInfo();  
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
    this.miForm.get('propietario')?.setValue(this.selectedItem.nombre);    
    this.miForm.enable();
    this.forLoad=true;   
  }
  
  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

  editable(){
    this.editar=true;    
  }
  cancelar(){
    this.editar=false;
    this.miForm.reset();
   this.limpiarInfo();
  }
  crearMascota(){
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
    const body:Mascotas={
      propietario:this.selectedItem.documento,
      nombre:this.miForm.get('nombre')?.value,   
      tipo:this.miForm.get('tipo')?.value   

    }
    this.clientS.createPet(body).subscribe(resp=>{
      if(resp.error){
        const msg=resp.error.errors[0].msg;
        const param=resp.error.errors[0].param;
        Swal.fire({
          icon: 'error',
          title: 'Oops...'+param,
          text: msg,
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Mascota creada correctamente',
        text:  resp.statusDescription,
      }).then(r=>{
        this.miForm.reset();
        this.forLoad=false;
        this.criterio='';
        this.limpiarInfo();
      }
      )
    });
  }

}
