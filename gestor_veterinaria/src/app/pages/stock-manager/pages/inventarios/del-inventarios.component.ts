import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, map, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { StManagerService } from '../../services/st-manager.service';
import { ProductoModel, StockModel } from '../../interfaces/stock-manager';


@Component({
  selector: 'app-del-inventarios',
  templateUrl: './del-inventarios.component.html',
  styleUrls:['./inventarios.component.css']
})
export class DelInventariosComponent implements OnInit {

  miForm=this.fb.group({
    producto:[,[Validators.required]],
    stock:[0,[Validators.required,Validators.min(0)]],
    stockMin:[0,[Validators.required,Validators.min(0)]],
    stockMax:[0,[Validators.required,Validators.min(0)]],
    PrecioVenta:[0,[Validators.required, Validators.min(1)]], 
    impuesto:[19,[Validators.required, Validators.min(0)]] ,
    descuento:[0,[Validators.required, Validators.min(0)]] ,
  })

  public productosL:ProductoModel[]=[];
  public stocksL:StockModel[]=[];

  myControl = new FormControl();
  public criterio:string='';
  public productoO:ProductoModel[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedProduct!:ProductoModel;
  public selectedItem!:StockModel[];
  filteredOptions!: Observable<ProductoModel[]>;
  public editar:boolean=false;

  constructor(private fb:FormBuilder,private smgService: StManagerService) { }

  ngOnInit(): void {
    this.loadProductos();
    this.loadStocks();
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
    this.selectedItem=JSON.parse(localStorage.getItem('search')||''); 
    
  }

  loadProductos(){
    this.smgService.getAllProducts().subscribe(resp=>{
      if(resp.productos){
        this.productosL=resp.productos[0];
        return;
      }
    })
  }

  /**Carga los inventarios */
  loadStocks(){
    this.smgService.getCompleteStock().subscribe(resp=>{
      if(resp.stocks){
        this.stocksL=resp.stocks[0];
        return;
      }
    })
  }
  setDefaultForm(){
    this.miForm.get('stock')?.setValue(0);
    this.miForm.get('stockMin')?.setValue(0);
    this.miForm.get('stockMax')?.setValue(0);
    this.miForm.get('PrecioVenta')?.setValue(0);
    this.miForm.get('impuesto')?.setValue(19);
    this.miForm.get('descuento')?.setValue(0);
    this.forLoad=false;
    this.loadStocks();
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
    this.searchStock(this.selectedProduct.idProductos||0); 
    if(this.selectedItem.length>0)   {
      this.miForm.get('producto')?.setValue(this.selectedItem[0].producto);
      this.miForm.get('stock')?.setValue(this.selectedItem[0].stock);
      this.miForm.get('stockMin')?.setValue(this.selectedItem[0].stockMin);
      this.miForm.get('stockMax')?.setValue(this.selectedItem[0].stockMax);
      this.miForm.get('PrecioVenta')?.setValue(this.selectedItem[0].PrecioVenta);
      this.miForm.get('impuesto')?.setValue(this.selectedItem[0].impuesto);
      this.miForm.get('descuento')?.setValue(this.selectedItem[0].descuento);
     
      this.forLoad=true;   
    }
  }

  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }


  limpiarInfo(){
    this.selectedItem=[];
    this.forLoad=false;
    this.forQuery=false;
    localStorage.removeItem('search');
    this.miForm.reset();
    this.miForm.disable();
    this.editar=false;
  }

  editable(){
    this.editar=true;  
  }
  cancelar(){
    this.editar=false;
    this.miForm.reset();
   this.limpiarInfo();
  }

  searchStock(producto:number){
       
      this.selectedItem=this.stocksL.filter(x=>x.producto===producto);
      if(this.selectedItem.length===0){
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontró inventario para el producto',
        });
       
      }
      return;
  }

  deleteInventario(){
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
    const body:StockModel={
      idInventario:this.selectedItem[0].idInventario
    }

    this.smgService.delInventario(body).subscribe(resp=>{
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
        title: 'Eliminación correcta',
        text:  resp.statusDescription,
      }).then(r=>{        
       this.miForm.reset();
       this.stocksL=this.stocksL.filter(x=>x.idInventario!=this.selectedItem[0].idInventario);
       this.setDefaultForm();
       this.selectedItem=[];
      }
      )
    });

  }

}
