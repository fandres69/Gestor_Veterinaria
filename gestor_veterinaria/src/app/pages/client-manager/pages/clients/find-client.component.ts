import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable, map, debounceTime } from 'rxjs';
import { DataMasterService } from 'src/app/pages/control-panel/services/data-master.service';
import { ciudadModel, tipoDocumentoModel } from 'src/app/pages/data-master-manager/interfaces/data-master-interface';
import Swal from 'sweetalert2';
import { ClientsGV } from '../../interfaces/clients';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
  selector: 'app-find-client',
  templateUrl: './find-client.component.html',
  styles: [
  ]
})
export class FindClientComponent implements OnInit {

  myControl = new FormControl();
  public criterio:string='';
  public clientes:ClientsGV[]=[];
  public forQuery:boolean=false;
  public forLoad:boolean=false;
  public selectedItem!:ClientsGV;
  public tipo:string='N';
  public ciudadesL!:ciudadModel[];
  public tiposDocL!:tipoDocumentoModel[];
  filteredOptions!: Observable<ClientsGV[]>;

  constructor(private fb:FormBuilder,private clientS: ClientServiceService, private dataM:DataMasterService) { }

  ngOnInit(): void {
    this.limpiarInfo();
    this.loadCiudades();
    this.loadTiposDoc();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
  }

  /**Consulta la base de datos con el criterio de búsqueda */
  private _filter(value: string): ClientsGV[] {
   
    debounceTime(200);   
    if(this.criterio!=''){
      this.clientS.getClients(this.criterio, this.tipo).subscribe(resp=>{
        if(resp.error){
          this.clientes=[];
        }
        this.clientes=resp.clientes[0];
      })
     
    }
    const filterValue = value.toLowerCase();
    if(this.clientes.length===0){
      return [{nombre:'No hay coincidencias'}];
    }
    if (this.tipo==='N') {
      return this.clientes.filter(x => x.nombre?.toLowerCase().includes(filterValue))||{nombre:'No hay coincidencias'};
      
    } else {
      return this.clientes.filter(x => x.documento?.toString().toLowerCase().includes(filterValue))||{nombre:'No hay coincidencias'};
    }
  }

  limpiarInfo(){
    this.selectedItem={};
    this.forLoad=false;
    this.forQuery=false;
    localStorage.removeItem('search');   
  }

  selectForQuery(objeto:ClientsGV){
    this.forQuery=true;
    localStorage.setItem('search',JSON.stringify(objeto));
  }

  loadInfo(){    
    if(!this.forQuery){
      Swal.fire({
        text: "No has seleccionado un cliente aun",
        icon: 'warning',
      });
      return;
    }
    this.selectedItem=JSON.parse(localStorage.getItem('search')||'');  
    this.forLoad=true;   
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

}
