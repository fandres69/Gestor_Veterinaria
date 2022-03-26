import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ChangePassComponent } from './control-panel/change-pass.component';
import { PanelClientsComponent } from './client-manager/pages/panel-clients/panel-clients.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';

const routes:Routes=[
{
  path:'',
  component:HomeComponent,
  children:[
    {
      path:'panel',
      component:ControlPanelComponent, 
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]   
    },
    {
      path:'userpass',
      component:ChangePassComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
    },
    {
      path:'clientManager',
      component:PanelClientsComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
    }
  ]
  
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],  
  exports:[RouterModule]
})
export class GestorVeterinariaRoutingModule { }
