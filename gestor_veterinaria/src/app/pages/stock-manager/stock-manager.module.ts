import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockManagerRoutingModule } from './stock-manager-routing.module';
import { StockManagerPanelComponent } from './pages/stock-manager-panel/stock-manager-panel.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { IngresosInventarioComponent } from './pages/ingresos-inventario/ingresos-inventario.component';
import { FindIngresoComponent } from './pages/ingresos-inventario/find-ingreso.component';
import { UpdIngresoComponent } from './pages/ingresos-inventario/upd-ingreso.component';
import { DelIngresoComponent } from './pages/ingresos-inventario/del-ingreso.component';
import { FindInventariosComponent } from './pages/inventarios/find-inventarios.component';
import { UpdInventariosComponent } from './pages/inventarios/upd-inventarios.component';
import { DelInventariosComponent } from './pages/inventarios/del-inventarios.component';
import { FindServicioComponent } from './pages/servicios/find-servicio.component';
import { UpdServicioComponent } from './pages/servicios/upd-servicio.component';
import { DelServicioComponent } from './pages/servicios/del-servicio.component';
import { FindProductoComponent } from './pages/productos/find-producto.component';
import { UpdProductoComponent } from './pages/productos/upd-producto.component';
import { DelProductoComponent } from './pages/productos/del-producto.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [
    StockManagerPanelComponent,
    ProductosComponent,
    ServiciosComponent,
    InventariosComponent,
    IngresosInventarioComponent,
    FindIngresoComponent,
    UpdIngresoComponent,
    DelIngresoComponent,
    FindInventariosComponent,
    UpdInventariosComponent,
    DelInventariosComponent,
    FindServicioComponent,
    UpdServicioComponent,
    DelServicioComponent,
    FindProductoComponent,
    UpdProductoComponent,
    DelProductoComponent
  ],
  imports: [
    CommonModule,
    StockManagerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
   
  ]
})
export class StockManagerModule { }
