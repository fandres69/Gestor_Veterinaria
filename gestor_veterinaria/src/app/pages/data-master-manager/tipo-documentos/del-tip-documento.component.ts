import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, map, debounceTime } from 'rxjs';
import { tipoDocumentoModel } from '../interfaces/data-master-interface';
import { MasterDataService } from '../services/master-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-del-tip-documento',
  templateUrl: './del-tip-documento.component.html',
  styles: [
  ]
})
export class DelTipDocumentoComponent implements OnInit {

  myControl = new FormControl();
  public criterio:string='';
  public tipoDocumento:tipoDocumentoModel[]=[{idtipoDocumento:0,tipoDocumento:''}];
  public forDelete:boolean=false;
  public forLoad:boolean=false;
  public selTipoDoc!:tipoDocumentoModel;

  filteredOptions!: Observable<tipoDocumentoModel[]>;



  miForm=this.fb.group({
    idtipoDocumento:[''],
    tipoDocumento:[''],
  });
  constructor(private fb:FormBuilder,private masterD:MasterDataService) { }


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // startWith(''),
      map(value => this._filter(value)),
      );
  }

  deleteTipoDocumentos(){

    const body={idtipoDocumento:this.selTipoDoc.idtipoDocumento,tipoDocumento:this.miForm.get('tipoDocumento')?.value};   
    this.masterD.delTypeDocument(body).subscribe(resp=>{
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
        }).then(rr=>{
         this.limpiarInfo();
         this.criterio='';
         this.tipoDocumento=[{idtipoDocumento:0,tipoDocumento:''}];
        });
      }

    })

  }

  selectForUpdate(tipoDocumento:tipoDocumentoModel){
    this.forDelete=true;
    localStorage.setItem('updTypeDoc',JSON.stringify(tipoDocumento));
  
  }

  loadInfo(){    
    if(!this.forDelete){
      Swal.fire({
        text: "No has seleccionado una tipo de documento aun",
        icon: 'warning',
      });
      return;
    }
    this.selTipoDoc=JSON.parse(localStorage.getItem('updTypeDoc')||'');    
    this.miForm.get('idtipoDocumento')?.setValue(this.selTipoDoc.idtipoDocumento);
    this.miForm.get('tipoDocumento')?.setValue(this.selTipoDoc.tipoDocumento);
    this.forLoad=true;   
  }

  limpiarInfo(){
    this.selTipoDoc={idtipoDocumento:0,tipoDocumento:''};
    this.forLoad=false;
    this.forDelete=false;
    localStorage.removeItem('updTypeDoc');
   
  }

  private _filter(value: string): tipoDocumentoModel[] {
   
    debounceTime(150);   
    if(this.criterio!=''){
      this.masterD.searchTipoDocumento(this.criterio).subscribe(resp=>{
        if(resp.error){
          this.tipoDocumento=[];
        }
        this.tipoDocumento=resp.tipoDocumento;
      })
     
    }
    const filterValue = value.toLowerCase();
    if(this.tipoDocumento.length===0){
      return [{idtipoDocumento:0,tipoDocumento:'No hay coincidencias'}];
    }
    return this.tipoDocumento.filter(x => x.tipoDocumento.toLowerCase().includes(filterValue))||{idtipoDocumento:0,tipoDocumento:'No hay coincidencias'};
  }

}
