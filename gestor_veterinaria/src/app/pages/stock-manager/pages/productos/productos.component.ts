import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ciudadModel } from 'src/app/pages/data-master-manager/interfaces/data-master-interface';
import { DataMasterService } from '../../../control-panel/services/data-master.service';
import { StManagerService } from '../../services/st-manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {
   
  miForm=this.fb.group({
    producto:['',[Validators.required,Validators.minLength(3)]],
    ciudad:['11001',[Validators.required]],
    presentacion:['',[Validators.required,Validators.minLength(3)]],
    unEmpaque:[0,[Validators.required,Validators.min(1)]],
    descripcion:['',[Validators.required, Validators.minLength(3)]]    
  });
  public ciudadesL!:ciudadModel[];


  constructor(private fb:FormBuilder, private dataM:DataMasterService, private smgService:StManagerService) { }

  ngOnInit(): void {
    this.loadCiudades();
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

  /**Crea un producto */
  crearProducto(){
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
    const body={
      producto:this.miForm.get('producto')?.value,
      ciudad:this.miForm.get('ciudad')?.value,
      presentacion:this.miForm.get('presentacion')?.value,
      unEmpaque:this.miForm.get('unEmpaque')?.value,
      descripcion:this.miForm.get('descripcion')?.value,
    };

    this.smgService.cProduct(body).subscribe(resp=>{
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
        title: 'Creación correcta',
        text:  resp.statusDescription,
      }).then(r=>{
        this.miForm.reset();       
      }
      )
    })
 
  }

}
