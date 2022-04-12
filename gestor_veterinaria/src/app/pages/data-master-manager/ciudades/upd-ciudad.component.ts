import { Component, OnInit } from '@angular/core';
import { ciudadModel } from '../interfaces/data-master-interface';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, debounceTime, map } from 'rxjs';
import { MasterDataService } from '../services/master-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upd-ciudad',
  templateUrl: './upd-ciudad.component.html',
  styles: [
  ]
})
export class UpdCiudadComponent implements OnInit {

  myControl = new FormControl();
  public criterio:string='';
  public ciudades:ciudadModel[]=[{Ciudad:'',codigo:'',codigoDto:'',Departamento:''}];
  public forDelete:boolean=false;
  public forLoad:boolean=false;
  public selCiudad!:ciudadModel;

  filteredOptions!: Observable<ciudadModel[]>;



  miForm=this.fb.group({
    codigo:[''],
    Ciudad:[''],
    codigoDto:[''],
    Departamento:[''],
  });
  constructor(private fb:FormBuilder,private masterD:MasterDataService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // startWith(''),
      map(value => this._filter(value)),
    );
  }

  updateCiudad(){

    const body={codigo:this.selCiudad.codigo,codigoDto:this.miForm.get('codigoDto')?.value
      ,Departamento:this.miForm.get('Departamento')?.value,Ciudad:this.miForm.get('Ciudad')?.value};   
    this.masterD.updCiudad(body).subscribe(resp=>{
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

  selectForUpdate(ciudad:ciudadModel){
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
    this.miForm.get('codigo')?.setValue(this.selCiudad.codigo);
    this.miForm.get('Ciudad')?.setValue(this.selCiudad.Ciudad);
    this.miForm.get('codigoDto')?.setValue(this.selCiudad.codigoDto);
    this.miForm.get('Departamento')?.setValue(this.selCiudad.Departamento);
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
