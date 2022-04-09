import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StManagerService } from '../../services/st-manager.service';
import { ProductoModel, StockModel, IngresosInvModel } from '../../interfaces/stock-manager';
import { Observable, map, debounceTime } from 'rxjs';


@Component({
  selector: 'app-ingresos-inventario',
  templateUrl: './ingresos-inventario.component.html',
  styleUrls:['./ingresos-inventario.component.css']
})
export class IngresosInventarioComponent implements OnInit {

  miForm=this.fb.group({
    producto:[,[Validators.required]],
    cantidad:[0,[Validators.required,Validators.min(0)]],
    Precio:[0,[Validators.required,Validators.min(0)]],   
    fecha:[0,[Validators.required]],   
  })

  public productosL:ProductoModel[]=[];

  myControl = new FormControl();
  public criterio:string='';
  public productoO:ProductoModel[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedProduct!:ProductoModel;

  filteredOptions!: Observable<ProductoModel[]>;
  public editar:boolean=false;
  constructor(private fb:FormBuilder,private smgService: StManagerService) { }

  ngOnInit(): void {
    this.loadProductos();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
  }

  /**Consulta la base de datos con el criterio de búsqueda */
  private _filter(value: string): ProductoModel[] {
  
    debounceTime(200);   
   
    const filterValue = value.toLowerCase();
   
    return this.productosL.filter(x => x.producto?.toLowerCase().includes(filterValue))||{producto:'No hay coincidencias'};
    
  }

  
  selectForQuery(objeto:ProductoModel){
    this.forQuery=true;
    localStorage.setItem('search',JSON.stringify(objeto));
  }

  loadProductos(){
    this.smgService.getAllProducts().subscribe(resp=>{
      if(resp.productos){
        this.productosL=resp.productos[0];
        return;
      }
    })
  }

 


  loadInfo(){    
    if(!this.forQuery){
      Swal.fire({
        text: "No has seleccionado un producto aun",
        icon: 'warning',
      });
      return;
    }
    this.selectedProduct=JSON.parse(localStorage.getItem('search')||''); 
    console.log(this.selectedProduct);
    this.miForm.get('producto')?.setValue(this.selectedProduct.idProductos);
    this.miForm.enable();
    this.miForm.get('producto')?.disable();
    this.forLoad=true;
    this.editar=true;
  }

  
  limpiarInfo(){
    this.forLoad=false;
    this.forQuery=false;
    localStorage.removeItem('search');
    this.miForm.reset();
    this.miForm.disable();
    this.editar=false;
  }

  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

createStockIn(){
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
 
  const body:IngresosInvModel={   
    producto:this.selectedProduct.idProductos,
    cantidad:this.miForm.get('cantidad')?.value,
    Precio:this.miForm.get('Precio')?.value,
    dia:fecha.getDate(),
    mes:month,
    anio:fecha.getFullYear()
  }

  this.smgService.cIngresosInv(body).subscribe(resp=>{
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
