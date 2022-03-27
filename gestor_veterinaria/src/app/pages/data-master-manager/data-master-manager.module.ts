import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelDataMasterComponent } from './panel-data-master/panel-data-master.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { UpdCiudadComponent } from './ciudades/upd-ciudad.component';
import { DelCiudadComponent } from './ciudades/del-ciudad.component';
import { FindCiudadComponent } from './ciudades/find-ciudad.component';
import { TipoDocumentosComponent } from './tipo-documentos/tipo-documentos.component';
import { FindTipDocumentoComponent } from './tipo-documentos/find-tip-documento.component';
import { UpdTipDocumentoComponent } from './tipo-documentos/upd-tip-documento.component';
import { DelTipDocumentoComponent } from './tipo-documentos/del-tip-documento.component';
import { DataMasterRoutingModule } from './data-master-routing.module';



@NgModule({
  declarations: [
    PanelDataMasterComponent,
    CiudadesComponent,
    UpdCiudadComponent,
    DelCiudadComponent,
    FindCiudadComponent,
    TipoDocumentosComponent,
    FindTipDocumentoComponent,
    UpdTipDocumentoComponent,
    DelTipDocumentoComponent
  ],
  imports: [
    CommonModule,
    DataMasterRoutingModule
  ]
})
export class DataMasterManagerModule { }
