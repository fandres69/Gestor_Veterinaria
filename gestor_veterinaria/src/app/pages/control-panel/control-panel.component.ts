import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CryptoAppService } from '../services/crypto-app.service';
import { Usuario, userSessionFind } from '../../auth/interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataMasterService } from './services/data-master.service';
import { typeDocumentsRes } from './interfaces/datamaster';

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

  miForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(3)]],
    documento:['',[Validators.required,Validators.min(1000)]],
    tipodoc:[1],
    celular:['',[Validators.required,Validators.min(1000)]],
    email:['',[Validators.required,Validators.email]],
    usuario:['',[Validators.required,Validators.minLength(3),Validators.maxLength(80)]]
  })
 
  constructor(private autServ:AuthService, private cry:CryptoAppService,
  private fb:FormBuilder,private dataM:DataMasterService) { }


  ngOnInit(): void {
    let id= localStorage.getItem('x-vetspa')||'';
    id=this.cry.decrypt(id);
    this.documento= parseInt(id);
    this.findInfo();
    this.getTypeDocs();
  }


 

  findInfo(){
    this.autServ.findUserSession(this.documento).subscribe(resp=>{
      if(resp){
        this.aUserSession= this.autServ.userSession;        
        return;
      }    
    });

  }

  getTypeDocs(){
    this.dataM.getCiudades().subscribe(resp=>{
      console.log(resp);
      this.tipoDocumentos=resp;
      console.log(this.tipoDocumentos);
      this.tipoDocumentos.result.forEach(element => {
        this.tDoc.push(element);
      });
    })
  }

  editar(){
    this.ediState=true;
  }

  guardar(){
    this.ediState=false;
  }
}
