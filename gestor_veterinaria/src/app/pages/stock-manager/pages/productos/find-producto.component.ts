import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ciudadModel, tipoDocumentoModel } from '../../../data-master-manager/interfaces/data-master-interface';
import { Observable, map, debounceTime } from 'rxjs';
import { DataMasterService } from '../../../control-panel/services/data-master.service';
import Swal from 'sweetalert2';
import { ProductoModel } from '../../interfaces/stock-manager';
import { StManagerService } from '../../services/st-manager.service';

@Component({
  selector: 'app-find-producto',
  templateUrl: './find-producto.component.html',
  styleUrls: ['./productos.component.css']
})
export class FindProductoComponent implements OnInit {

  myControl = new FormControl();
  public criterio:string='';
  public productosO:ProductoModel[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedItem!:ProductoModel;
  public ciudadesL!:ciudadModel[];
  filteredOptions!: Observable<ProductoModel[]>;
  public editar:boolean=false;

  miForm=this.fb.group({
    producto:['',[Validators.required,Validators.minLength(3)]],
    ciudad:['11001',[Validators.required]],
    presentacion:['',[Validators.required,Validators.minLength(3)]],
    unEmpaque:[0,[Validators.required,Validators.min(1)]],
    descripcion:['',[Validators.required, Validators.minLength(3)]] 
  })


  constructor(private fb:FormBuilder,private smgService: StManagerService, private dataM:DataMasterService) { }

  ngOnInit(): void {
    this.limpiarInfo();   
    this.loadCiudades();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
    
  }

  /**Consulta la base de datos con el criterio de búsqueda */
  private _filter(value: string): ProductoModel[] {
  
    debounceTime(200);   
    if(this.criterio!=''){
      this.smgService.getProducts(this.criterio).subscribe(resp=>{
        if(resp.error){
          this.productosO=[];
        }
        this.productosO=resp.productos[0];
      })
     
    }
    const filterValue = value.toLowerCase();
    if(this.productosO.length===0){
      return [{producto:'No hay coincidencias'}];
    }
    return this.productosO.filter(x => x.producto?.toLowerCase().includes(filterValue))||{nombre:'No hay coincidencias'};
    
  }

  selectForQuery(objeto:ProductoModel){
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
  loadInfo(){    
    if(!this.forQuery){
      Swal.fire({
        text: "No has seleccionado un producto aun",
        icon: 'warning',
      });
      return;
    }
    this.selectedItem=JSON.parse(localStorage.getItem('search')||'');  
    this.miForm.get('producto')?.setValue(this.selectedItem.producto);    
    this.miForm.get('ciudad')?.setValue(this.selectedItem.ciudad);  
    this.miForm.get('presentacion')?.setValue(this.selectedItem.presentacion);  
    this.miForm.get('unEmpaque')?.setValue(this.selectedItem.unEmpaque);  
    this.miForm.get('descripcion')?.setValue(this.selectedItem.descripcion);  
    this.miForm.disable();
    this.forLoad=true;   
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
    this.miForm.reset();
   this.limpiarInfo();
  }


}
