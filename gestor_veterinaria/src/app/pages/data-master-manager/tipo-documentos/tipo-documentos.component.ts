import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MasterDataService } from '../services/master-data.service';

@Component({
  selector: 'app-tipo-documentos',
  templateUrl: './tipo-documentos.component.html',
  styles: [
  ]
})
export class TipoDocumentosComponent implements OnInit {

  miForm=this.fb.group({
    tipoDocumento:['',Validators.required,Validators.minLength(1),Validators.maxLength(100)],
  });
  constructor(private fb:FormBuilder,private masterD:MasterDataService) { }

  ngOnInit(): void {
  }

  crearTipoDocumento(){
    const body={
      tipoDocumento:this.miForm.get('tipoDocumento')?.value     
    }
    this.masterD.createTipoDocumento(body).subscribe(resp=>{
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
