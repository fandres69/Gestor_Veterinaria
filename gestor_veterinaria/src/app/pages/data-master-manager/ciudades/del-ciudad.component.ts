import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MasterDataService } from '../services/master-data.service';
import { ciudadModel } from '../interfaces/data-master-interface';
import { debounceTime, distinctUntilChanged, Observable, OperatorFunction, map, of,startWith } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-del-ciudad',
  templateUrl: './del-ciudad.component.html',
  styles: [
  ]
})
export class DelCiudadComponent implements OnInit {

  myControl = new FormControl();
  public criterio:string='';
  public ciudades:ciudadModel[]=[{Ciudad:'',codigo:'',codigoDto:'',Departamento:''}];
  public forDelete:boolean=false;
  public forLoad:boolean=false;
  public selCiudad!:ciudadModel;

  filteredOptions!: Observable<ciudadModel[]>;



  miForm=this.fb.group({
    codigo:['',Validators.required,Validators.minLength(1),Validators.maxLength(100)],
    Ciudad:['',Validators.required,Validators.minLength(1),Validators.maxLength(200)],
    codigoDto:['',Validators.required,Validators.minLength(1),Validators.maxLength(100)],
    Departamento:['',Validators.required,Validators.minLength(1),Validators.maxLength(150)],
  });
  constructor(private fb:FormBuilder,private masterD:MasterDataService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // startWith(''),
      map(value => this._filter(value)),
    );
  }

  deleteCiudad(){
    const body ={codigo:this.selCiudad.codigo};
    this.masterD.delCiudad(body).subscribe(resp=>{
      console.log(resp);
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
         this.ciudades=[{Ciudad:'',codigo:'',codigoDto:'',Departamento:''}];
        });
      }

    })

  }

  selectForDelete(ciudad:ciudadModel){
    this.forDelete=true;
    localStorage.setItem('delCiudad',JSON.stringify(ciudad));
  
  }

  loadInfo(){    
    if(!this.forDelete){
      Swal.fire({
        text: "No has seleccionado una ciudad aun",
        icon: 'warning',
      });
      return;
    }
    this.selCiudad=JSON.parse(localStorage.getItem('delCiudad')||'');    
    console.log(this.selCiudad);
    this.forLoad=true;   
  }

  limpiarInfo(){
    this.selCiudad={Ciudad:'',codigo:'',codigoDto:'',Departamento:''};
    this.forLoad=false;
    this.forDelete=false;
    localStorage.removeItem('delCiudad');
   
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
