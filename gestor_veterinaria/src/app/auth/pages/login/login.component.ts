import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario, AuthResponse } from '../../interfaces/usuario';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule, FormControl} from '@angular/forms';
import  Swal  from "sweetalert2";
import { MessagesAuth } from '../../enums/messages-auth';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {

  private usuarioN:string='';
  private password:string='';

  // myForm= new FormGroup({
  //   usuarioN:new FormControl('',[Validators.required,Validators.minLength(3)]),
  //   password: new FormControl('',[Validators.required,Validators.minLength(3)])
  // });
  miForm:FormGroup=this.fb.group({
    usuarioN:['',[Validators.required,Validators.minLength(3)]],
    password:['',Validators.required,Validators.minLength(6)]
  });

  private _UserL!:AuthResponse;
  constructor(private authService:AuthService, private fb:FormBuilder) {
    let prueba='hola';
   }

  ngOnInit(): void {
  }

  login(){  
    console.log(this.miForm.get('usuarioN')?.value);
      console.log(this.miForm.get('password')?.value);
    this.authService.login(this.miForm.get('usuarioN')?.value,this.miForm.get('password')?.value).subscribe(resp=>{     
     console.log(resp); 
     if(resp.status){
      console.log('Param: '+resp.error.errors[0].param+' msg: '+resp.error.errors[0].msg);
      Swal.fire({
        icon: 'error',
        title: resp.error.errors[0].param,
        text: resp.error.errors[0].msg
      })
      return;       
     }
     if(resp){
       
      this._UserL=this.authService.userRes;
      console.log(this._UserL.token); 
      localStorage.setItem('x-token',this._UserL.token!) ,
      Swal.fire({title:MessagesAuth.LOGIN_SUCCESS,text:`Bienvenido ${this._UserL.usuario}`});
     
     }     
    
    });
  }
  
  validaToken(){
    this.authService.validToken().subscribe(resp=>{
     console.log(resp);
    })
  }
  
}
