import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ChangePassComponent } from './control-panel/change-pass.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';
import { HomePageComponent } from './home/home-page.component';

const routes:Routes=[
{
  path:'',
  component:HomeComponent,  
  children:[
    {
      path:'home',
      component:HomePageComponent, 
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]   
    },
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
      loadChildren:()=>import('../pages/client-manager/client-manager.module').then(m=>m.ClientManagerModule),
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
    },
    {
      path:'stockManager',
      loadChildren:()=>import('../pages/stock-manager/stock-manager.module').then(m=>m.StockManagerModule),
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
    },
    {
      path:'salesManager',
      loadChildren:()=>import('../pages/sales-manager/sales-manager.module').then(m=>m.SalesManagerModule),
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
    },
    {
      path:'dataMaster',
      loadChildren:()=>import('../pages/data-master-manager/data-master-manager.module').then(m=>m.DataMasterManagerModule),
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
    }
  ]
  
},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],  
  exports:[RouterModule]
})
export class GestorVeterinariaRoutingModule { }
