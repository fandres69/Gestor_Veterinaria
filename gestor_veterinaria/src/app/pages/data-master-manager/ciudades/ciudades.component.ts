import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterDataService } from '../services/master-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styles: [
  ]
})
export class CiudadesComponent implements OnInit {

  miForm=this.fb.group({
    codigo:['',Validators.required,Validators.minLength(1),Validators.maxLength(100)],
    Ciudad:['',Validators.required,Validators.minLength(1),Validators.maxLength(200)],
    codigoDto:['',Validators.required,Validators.minLength(1),Validators.maxLength(100)],
    Departamento:['',Validators.required,Validators.minLength(1),Validators.maxLength(150)],
  });
  constructor(private fb:FormBuilder,private masterD:MasterDataService) { }

  ngOnInit(): void {
  }

  crearCiudad(){
    const body={
      codigo:this.miForm.get('codigo')?.value,
      Ciudad:this.miForm.get('Ciudad')?.value,
      codigoDto:this.miForm.get('codigoDto')?.value,
      Departamento:this.miForm.get('Departamento')?.value
    }
    this.masterD.CreateCiudad(body).subscribe(resp=>{
      if(resp.error){
        
        const mdgErr=resp.error.errors[0].msg||'';
        const campo='Campo: '+resp.error.errors[0].param||'';
        Swal.fire({
          icon: 'error',
          title: 'Oops... '+campo,
          text: mdgErr
        });
        return;
      }
      if(resp.OK){
        Swal.fire({
          icon: 'success',
          title: 'Operación correcta',
          text: resp.statusDescription
        }).then(resp=>{
          this.miForm.reset();
        });
      }

    });
  }
}
