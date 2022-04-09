import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { StManagerService } from '../../services/st-manager.service';
import Swal from 'sweetalert2';
import { ServiciosModel } from '../../interfaces/stock-manager';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: [
  ]
})
export class ServiciosComponent implements OnInit {

   
  miForm=this.fb.group({
    servicio:['',[Validators.required,Validators.minLength(3)]],
    descripcion:['',[Validators.required,Validators.minLength(3)]],
    precio:[0,[Validators.required,Validators.min(1)]],
    impuesto:[19,[Validators.required,Validators.min(0)]],
    descuento:[0,[Validators.required, Validators.min(0)]]    
  });
  


  constructor(private fb:FormBuilder,private smgService:StManagerService) { }

  ngOnInit(): void {
  }

     
  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

  /**Crea un servicio */
  crearServicio(){
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
    const body:ServiciosModel={
      servicio:this.miForm.get('servicio')?.value,
      descripcion:this.miForm.get('descripcion')?.value,
      precio:this.miForm.get('precio')?.value,
      impuesto:this.miForm.get('impuesto')?.value,
      descuento:this.miForm.get('descuento')?.value,
    };

    this.smgService.cServicios(body).subscribe(resp=>{
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
