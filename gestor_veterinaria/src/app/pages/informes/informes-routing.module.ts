import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from 'src/app/auth/guards/validar-token.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasServiciosComponent } from './ventas-servicios/ventas-servicios.component';
import { VentasComponent } from './ventas/ventas.component';
import { GeneralComponent } from './general/general.component';
import { VentasClientesComponent } from './ventas-clientes/ventas-clientes.component';


const routes:Routes=[
  {
    path:'',
    component:DashboardComponent,
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard],
    children:[
      {
      path:'ventas',
      component:VentasComponent,
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
      }
      ,
      {
        path:'ventasServicios',
        component:VentasServiciosComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      }
      ,
      {
        path:'general',
        component:GeneralComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'porCliente',
        component:VentasClientesComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      }
  ]   
  }
]

@NgModule({
 
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class InformesRoutingModule { }
