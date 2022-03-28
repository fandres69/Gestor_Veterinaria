import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario, AuthResponse } from '../../interfaces/usuario';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule, FormControl} from '@angular/forms';
import  Swal  from "sweetalert2";
import { MessagesAuth } from '../../enums/messages-auth';
import { map } from 'rxjs';
import { CryptoAppService } from 'src/app/pages/services/crypto-app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {

  private usuarioN:string='';
  private password:string='';

  miForm:FormGroup=this.fb.group({
    usuarioN:['',[Validators.required,Validators.minLength(3)]],
    password:['',Validators.required,Validators.minLength(6)]
  });

  private _UserL!:AuthResponse;
  constructor(private authService:AuthService, private fb:FormBuilder, private router:Router
    ,private cry:CryptoAppService) {}

  ngOnInit(): void {
  }

  login(){     
    this.authService.login(this.miForm.get('usuarioN')?.value,this.miForm.get('password')?.value).subscribe(resp=>{     
   
     if(resp.status){
     
      Swal.fire({
        icon: 'error',
        title: resp.error.errors[0].param,
        text: resp.error.errors[0].msg
      })
      return;       
     }
     if(resp){       
      this._UserL=this.authService.userRes;
      localStorage.setItem('x-token',this._UserL.token!);
      let id= this.cry.encrypt(this._UserL.id!.toString());
      localStorage.setItem('x-vetspa',id);
      Swal.fire({title:MessagesAuth.LOGIN_SUCCESS,text:`Bienvenido ${this._UserL.usuario}`}).then(res=>{
       this.router.navigate(['/']);
      });
      
     }     
    
    });
  }
  
  validaToken(){
    this.authService.validToken().subscribe(resp=>{
     console.log(resp);
    })
  }
  
}
