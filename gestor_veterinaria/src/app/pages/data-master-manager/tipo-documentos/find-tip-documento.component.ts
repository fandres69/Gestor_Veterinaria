import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, map, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { tipoDocumentoModel } from '../interfaces/data-master-interface';
import { MasterDataService } from '../services/master-data.service';

@Component({
  selector: 'app-find-tip-documento',
  templateUrl: './find-tip-documento.component.html',
  styles: [
  ]
})
export class FindTipDocumentoComponent implements OnInit {
  myControl = new FormControl();
  public criterio:string='';
  public tipoDocumento:tipoDocumentoModel[]=[{idtipoDocumento:0,tipoDocumento:''}];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selTipoDocumento!:tipoDocumentoModel;

  filteredOptions!: Observable<tipoDocumentoModel[]>;

  constructor(private fb:FormBuilder,private masterD:MasterDataService) { }


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
  }

  
  selectForQuery(tipoDoc:tipoDocumentoModel){
    this.forQuery=true;
    localStorage.setItem('qTipoDoc',JSON.stringify(tipoDoc));
  
  }

  loadInfo(){    
    if(!this.forQuery){
      Swal.fire({
        text: "No has seleccionado una tipo de documento aun",
        icon: 'warning',
      });
      return;
    }
    this.selTipoDocumento=JSON.parse(localStorage.getItem('qTipoDoc')||'');    
    this.forLoad=true;   
  }

  limpiarInfo(){
    this.selTipoDocumento={idtipoDocumento:0,tipoDocumento:''};
    this.forLoad=false;
    this.forQuery=false;
    localStorage.removeItem('qTipoDoc');
   
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
