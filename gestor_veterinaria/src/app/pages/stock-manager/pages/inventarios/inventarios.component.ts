import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StManagerService } from '../../services/st-manager.service';
import { ProductoModel, StockModel } from '../../interfaces/stock-manager';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styles: [
  ]
})
export class InventariosComponent implements OnInit {

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

  constructor(private fb:FormBuilder,private smgService: StManagerService) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(){
    this.smgService.getAllProducts().subscribe(resp=>{
      if(resp.productos){
        this.productosL=resp.productos[0];
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
  }

  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

  crearStock(){
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
      producto:this.miForm.get('producto')?.value,
      stock:this.miForm.get('stock')?.value,
      stockMin:this.miForm.get('stockMin')?.value,
      stockMax:this.miForm.get('stockMax')?.value,
      PrecioVenta:this.miForm.get('PrecioVenta')?.value,
      impuesto:this.miForm.get('impuesto')?.value,
      descuento:this.miForm.get('descuento')?.value,
    }
    this.smgService.cInventario(body).subscribe(resp=>{
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
       this.setDefaultForm();
      }
      )
    });

  }

}
