import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPanelComponent } from './sales-panel/sales-panel.component';
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
import { SalesManagerRoutingModule } from './sales-manager-routing.module';



@NgModule({
  declarations: [
    SalesPanelComponent,
    PedidosComponent,
    FindPedidosComponent,
    UpdPedidosComponent,
    DelPedidosComponent,
    DetallesComponent,
    FindDetalleComponent,
    UpdDetalleComponent,
    DelDetalleComponent,
    DevolucionesComponent,
    FindDevolucionComponent,
    UpdDevolucionComponent,
    DelDevolucionComponent
  ],
  imports: [
    CommonModule,
    SalesManagerRoutingModule
  ]
})
export class SalesManagerModule { }
