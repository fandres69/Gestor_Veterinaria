import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, map, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { StManagerService } from '../../services/st-manager.service';
import { ServiciosModel } from '../../interfaces/stock-manager';

@Component({
  selector: 'app-find-servicio',
  templateUrl: './find-servicio.component.html',
  styleUrls:['./servicios.component.css']
})
export class FindServicioComponent implements OnInit {
  myControl = new FormControl();
  public criterio:string='';
  public productosO:ServiciosModel[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedItem!:ServiciosModel;
  filteredOptions!: Observable<ServiciosModel[]>;
  public editar:boolean=false;

  miForm=this.fb.group({
    servicio:['',[Validators.required,Validators.minLength(3)]],
    descripcion:['',[Validators.required,Validators.minLength(3)]],
    precio:[0,[Validators.required,Validators.min(1)]],
    impuesto:[19,[Validators.required,Validators.min(0)]],
    descuento:[0,[Validators.required, Validators.min(0)]]  
  })

  constructor(private fb:FormBuilder,private smgService: StManagerService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
  }

  /**Consulta la base de datos con el criterio de búsqueda */
  private _filter(value: string): ServiciosModel[] {
  
    debounceTime(200);   
    if(this.criterio!=''){
      this.smgService.getServicios(this.criterio).subscribe(resp=>{
        if(resp.error){
          this.productosO=[];
        }
        this.productosO=resp.servicios[0];
      })
     
    }
    const filterValue = value.toLowerCase();
    if(this.productosO.length===0){
      return [{servicio:'No hay coincidencias'}];
    }
    return this.productosO.filter(x => x.servicio?.toLowerCase().includes(filterValue))||{nombre:'No hay coincidencias'};
    
  }

  selectForQuery(objeto:ServiciosModel){
    this.forQuery=true;
    localStorage.setItem('search',JSON.stringify(objeto));   
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
  loadInfo(){    
    if(!this.forQuery){
      Swal.fire({
        text: "No has seleccionado un producto aun",
        icon: 'warning',
      });
      return;
    }
    this.selectedItem=JSON.parse(localStorage.getItem('search')||'');  
    this.miForm.get('servicio')?.setValue(this.selectedItem.servicio);    
    this.miForm.get('descripcion')?.setValue(this.selectedItem.descripcion);  
    this.miForm.get('precio')?.setValue(this.selectedItem.precio);  
    this.miForm.get('impuesto')?.setValue(this.selectedItem.impuesto);  
    this.miForm.get('descuento')?.setValue(this.selectedItem.descuento);  
    this.miForm.disable();
    this.forLoad=true;   
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
    this.miForm.reset();
   this.limpiarInfo();
  }

}
