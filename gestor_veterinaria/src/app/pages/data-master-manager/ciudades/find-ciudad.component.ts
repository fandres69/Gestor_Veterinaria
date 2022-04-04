import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable, map, debounceTime } from 'rxjs';
import { ciudadModel } from '../interfaces/data-master-interface';
import { MasterDataService } from '../services/master-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-find-ciudad',
  templateUrl: './find-ciudad.component.html',
  styles: [
  ]
})
export class FindCiudadComponent implements OnInit {

  myControl = new FormControl();
  public criterio:string='';
  public ciudades:ciudadModel[]=[{Ciudad:'',codigo:'',codigoDto:'',Departamento:''}];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selCiudad!:ciudadModel;

  filteredOptions!: Observable<ciudadModel[]>;

  constructor(private fb:FormBuilder,private masterD:MasterDataService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
  } 
  

  selectForQuery(ciudad:ciudadModel){
    this.forQuery=true;
    localStorage.setItem('qCiudad',JSON.stringify(ciudad));
  
  }

  loadInfo(){    
    if(!this.forQuery){
      Swal.fire({
        text: "No has seleccionado una ciudad aun",
        icon: 'warning',
      });
      return;
    }
    this.selCiudad=JSON.parse(localStorage.getItem('qCiudad')||'');    
    console.log(this.selCiudad);
    this.forLoad=true;   
  }

  limpiarInfo(){
    this.selCiudad={Ciudad:'',codigo:'',codigoDto:'',Departamento:''};
    this.forLoad=false;
    this.forQuery=false;
    localStorage.removeItem('qCiudad');
   
  }

  private _filter(value: string): ciudadModel[] {
   
    debounceTime(200);   
    if(this.criterio!=''){
      this.masterD.searchCiudades(this.criterio).subscribe(resp=>{
        if(resp.error){
          this.ciudades=[];
        }
        this.ciudades=resp.ciudades;
      })
     
    }
    const filterValue = value.toLowerCase();
    if(this.ciudades.length===0){
      return [{Ciudad:'No hay coincidencias',codigo:'',codigoDto:'',Departamento:''}];
    }
    return this.ciudades.filter(x => x.Ciudad.toLowerCase().includes(filterValue))||{Ciudad:'No hay coincidencias',codigo:'',codigoDto:'',Departamento:''};
  }

  


}
