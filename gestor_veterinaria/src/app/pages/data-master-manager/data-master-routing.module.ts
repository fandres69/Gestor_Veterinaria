import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelDataMasterComponent } from './panel-data-master/panel-data-master.component';
import { ValidarTokenGuard } from '../../auth/guards/validar-token.guard';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { FindCiudadComponent } from './ciudades/find-ciudad.component';
import { UpdCiudadComponent } from './ciudades/upd-ciudad.component';
import { DelCiudadComponent } from './ciudades/del-ciudad.component';
import { TipoDocumentosComponent } from './tipo-documentos/tipo-documentos.component';
import { FindTipDocumentoComponent } from './tipo-documentos/find-tip-documento.component';
import { UpdTipDocumentoComponent } from './tipo-documentos/upd-tip-documento.component';
import { DelTipDocumentoComponent } from './tipo-documentos/del-tip-documento.component';

const routes:Routes=[
{
  path:'',
  component:PanelDataMasterComponent,
  canActivate:[ValidarTokenGuard],
  canLoad:[ValidarTokenGuard],
  children:[
    {
      path:'cCiudad',
      component:CiudadesComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
    {
      path:'fCiudad',
      component:FindCiudadComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
    {
      path:'uCiudad',
      component:UpdCiudadComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
    {
      path:'dCiudad',
      component:DelCiudadComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
    {
      path:'cTipoDoc',
      component:TipoDocumentosComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
    {
      path:'fTipoDoc',
      component:FindTipDocumentoComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
    {
      path:'uTipoDoc',
      component:UpdTipDocumentoComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
    {
      path:'dTipoDoc',
      component:DelTipDocumentoComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard],
    },
  ]
}
]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DataMasterRoutingModule { }
