import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ciudadModel, tipoDocumentoModel } from 'src/app/pages/data-master-manager/interfaces/data-master-interface';
import { DataMasterService } from '../../../control-panel/services/data-master.service';
import Swal from 'sweetalert2';
import { ClientServiceService } from '../../services/client-service.service';
import { ClientsGV } from '../../interfaces/clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: [
  ]
})
export class ClientsComponent implements OnInit {


  miForm=this.fb.group({
    documento:[,[Validators.required, Validators.min(100000)]],
    tipodocumento:[1,[Validators.required]],
    nombre:['',[Validators.required,Validators.minLength(3)]],
    celular:[,[Validators.required,Validators.min(320500)]],
    direccion:['',[Validators.required, Validators.minLength(3)]],
    ciudad:['11001',[Validators.required]],
    email:['',[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  });

  public ciudadesL!:ciudadModel[];
  public tiposDocL!:tipoDocumentoModel[];

  constructor(private fb:FormBuilder, private dataM:DataMasterService, private clientS:ClientServiceService) { }

  ngOnInit(): void {
    this.loadCiudades();
    this.loadTiposDoc();
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

  /**Obtiene el listado de tipos de documentos */
  loadTiposDoc(){
    this.dataM.getTypeDocuments().subscribe(resp=>{
      if(resp.result){
        this.tiposDocL=resp.result;
        return;
      }
    })
  }

  ValidaCampo(campo:string){
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

  crearCliente(){
    if(this.miForm.invalid){
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Hay cosas por corregir',
      }).then(r=>{
        this.miForm.markAllAsTouched();
      })
    }
    const body:ClientsGV={
      documento:this.miForm.get('documento')?.value,
      tipodocumento:this.miForm.get('tipodocumento')?.value,
      nombre:this.miForm.get('nombre')?.value,
      celular:this.miForm.get('celular')?.value,
      direccion:this.miForm.get('direccion')?.value,
      ciudad:this.miForm.get('ciudad')?.value,
      email:this.miForm.get('email')?.value,
    }
    this.clientS.cretaClient(body).subscribe(resp=>{
      if(resp.error){
        const msg=resp.error.errors[0].msg;
        const param=resp.error.errors[0].param;
        Swal.fire({
          icon: 'error',
          title: 'Oops...'+param,
          text: msg,
        })
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
