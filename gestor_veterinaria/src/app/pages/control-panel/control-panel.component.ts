import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CryptoAppService } from '../services/crypto-app.service';
import { Usuario, userSessionFind } from '../../auth/interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataMasterService } from './services/data-master.service';
import { typeDocumentsRes } from './interfaces/datamaster';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  public usuarioSession!:Usuario;
  public aUserSession:userSessionFind={};
  private documento:number=0;
  private  tipoDocumentos!:typeDocumentsRes;
  public tDoc=[{idtipoDocumento:0,tipoDocumento:''}];
  public ediState=false;
  private ArchivoUser!:File;
  public imgLoad:any;
  public img!:string;

  miForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(3)]],
    documento:['',[Validators.required,Validators.min(1000)]],
    tipodoc:[],
    celular:['',[Validators.required,Validators.min(1000)]],
    email:['',[Validators.required,Validators.email]],
    usuario:['',[Validators.required,Validators.minLength(3),Validators.maxLength(80)]]
  })
 
  constructor(private autServ:AuthService,
  private fb:FormBuilder,private dataM:DataMasterService,private router:Router) { }


  ngOnInit(): void {
    let id= localStorage.getItem('x-vetspa')||'';
    //id=this.cry.decrypt(id);
    this.documento= parseInt(id);
    this. loadImgPerfil();
    this.findInfo();
    this.getTypeDocs();
  }


 
/**OPtiene la información del usuario */
  findInfo(){
    this.autServ.findUserSession(this.documento).subscribe(resp=>{
      if(resp){
        this.aUserSession= this.autServ.userSession;      
        this.miForm.get('nombre')?.setValue(this.aUserSession.nombre);
        this.miForm.get('documento')?.setValue(this.aUserSession.documento);
        this.miForm.get('tipodoc')?.setValue(this.aUserSession.tipoDocumento);
        this.miForm.get('celular')?.setValue(this.aUserSession.celular);
        this.miForm.get('email')?.setValue(this.aUserSession.email);
        this.miForm.get('usuario')?.setValue(this.aUserSession.usuario);
        return;
      }    
    });

  }

  getTypeDocs(){
    this.dataM.getTypeDocuments().subscribe(resp=>{
      this.tipoDocumentos=resp;
      this.tipoDocumentos.result.forEach(element => {
        this.tDoc.push(element);
      });
    })
  }

  editar(){
    this.ediState=true;
  }
  cancelar(){
    this.ediState=false;
  }
/**Actualiza la información del usuario */
  guardar(){

    const updUser={
      nombre:this.miForm.get('nombre')?.value,
      documento:this.miForm.get('documento')?.value,
      tipoDocumento:this.miForm.get('tipodoc')?.value,
      celular:this.miForm.get('celular')?.value,
      email:this.miForm.get('email')?.value,
      usuarioN:this.miForm.get('usuario')?.value,
      activo:1
    };
    this.dataM.updateUserSession(updUser).subscribe(resp=>{
      if(resp){
        Swal.fire({
          icon: 'success',
          title: resp.statusDescription,
          showConfirmButton: true,
        })
      }
    })
    this.ediState=false;
  }

  /**Carga la nueva imagen de usuario de usuario */
  loadPerfilImage(event:any){
    this.ArchivoUser=event.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(this.ArchivoUser);
    reader.onload=()=>{
      this.imgLoad=reader.result;
    }
  }

  /**Guarda la nueva imagen de usuario */
  savePerfilImage(){
  
    if(!this.ArchivoUser){
      Swal.fire('Selecciona una nueva imagen primero');
      return;
    }
    this.dataM.saveNewUserImage(this.ArchivoUser,localStorage.getItem('x-vetspa')||'0').subscribe(
      resp=>{     
        document.getElementById('cerrarModal')?.click();
        Swal.fire({
          icon: 'success',
          title: resp.statusDescription,
          showConfirmButton: true,
        })
        .then(
         resp=>{
          window.location.reload();
         }         
        );       
      }

    )
    return;
  }

  loadImgPerfil(){
    const documento=localStorage.getItem('x-vetspa')||'0';
    this.dataM.getUserImage(documento).subscribe(resp=>{
      this.img=resp;
    });
  }


  
}
