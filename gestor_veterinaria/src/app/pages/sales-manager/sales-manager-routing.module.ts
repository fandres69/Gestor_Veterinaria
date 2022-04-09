import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesPanelComponent } from './sales-panel/sales-panel.component';
import { ValidarTokenGuard } from '../../auth/guards/validar-token.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FindPedidosComponent } from './pedidos/find-pedidos.component';
import { UpdPedidosComponent } from './pedidos/upd-pedidos.component';
import { DelPedidosComponent } from './pedidos/del-pedidos.component';
import { DetallesComponent } from './detalles/detalles.component';
import { FindDetalleComponent } from './detalles/find-detalle.component';
import { UpdDetalleComponent } from './detalles/upd-detalle.component';
import { DelDetalleComponent } from './detalles/del-detalle.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { FindDevolucionComponent } from './devoluciones/find-devolucion.component';
import { UpdDevolucionComponent } from './devoluciones/upd-devolucion.component';
import { DelDevolucionComponent } from './devoluciones/del-devolucion.component';

const routes:Routes=[

  {
    path:'',
    component:SalesPanelComponent,
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard],
    children:[
      {
        path:'cPedidos',
        component:PedidosComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'fPedidos',
        component:FindPedidosComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'uPedidos',
        component:UpdPedidosComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'dPedidos',
        component:DelPedidosComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      
      {
        path:'cDetalles',
        component:DetallesComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'cDetalles/:idPedido',
        component:DetallesComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'fDetalles',
        component:FindDetalleComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'uDetalles',
        component:UpdDetalleComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'dDetalles',
        component:DelDetalleComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      //
      {
        path:'cDevoluciones',
        component:DevolucionesComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'fDevoluciones',
        component:FindDevolucionComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'uDevoluciones',
        component:UpdDevolucionComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'dDevoluciones',
        component:DelDevolucionComponent,
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
  exports:[RouterModule]
})
export class SalesManagerRoutingModule { }
