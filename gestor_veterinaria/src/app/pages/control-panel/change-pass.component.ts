import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { DataMasterService } from './services/data-master.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styles: [
  ]
})
export class ChangePassComponent implements OnInit {

  private documento:number=parseInt(localStorage.getItem('x-vetspa')||'0');

  miForm=this.fb.group({
    password:['',[Validators.required,Validators.minLength(6)]],
    nPassword:['',[Validators.required,Validators.minLength(6)]],
    cPassword:['',[Validators.required,Validators.minLength(6)]],
  });
  constructor(private autServ:AuthService, private dataM:DataMasterService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  updatePassword(){

    const pass=this.miForm.get('password')?.value;
    const nPass=this.miForm.get('nPassword')?.value;
    if(this.miForm.get('nPassword')?.value!=this.miForm.get('cPassword')?.value){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La nueva contraseña y la confirmación no coinciden'
      });
      return;
    }
    const body={'documento':this.documento,'password':nPass,'passwordActual':pass}
   this.dataM.updatePassword(body).subscribe(resp=>{

    if(resp.OK){
      Swal.fire({
        icon: 'success',
        title: 'Actualización correcta',
        text: resp.statusDescription
      }).then(resp=>{
        this.miForm.reset();
      })
      return;
    }
    if(resp.error){
      const msg:string= resp.error.errors[0].msg
      const campo:string='Campo: '+ resp.error.errors[0].param;
      Swal.fire({
        icon: 'error',
        title: 'Upsss... ha ocurrido un error '+campo,
        text: msg
      })
    }

   });

  }

}
