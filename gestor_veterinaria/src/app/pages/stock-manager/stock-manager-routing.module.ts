import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockManagerPanelComponent } from './pages/stock-manager-panel/stock-manager-panel.component';
import { ValidarTokenGuard } from '../../auth/guards/validar-token.guard';
import { ProductosComponent } from './pages/productos/productos.component';
import { FindProductoComponent } from './pages/productos/find-producto.component';
import { DelProductoComponent } from './pages/productos/del-producto.component';
import { UpdProductoComponent } from './pages/productos/upd-producto.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { FindInventariosComponent } from './pages/inventarios/find-inventarios.component';
import { UpdInventariosComponent } from './pages/inventarios/upd-inventarios.component';
import { DelInventariosComponent } from './pages/inventarios/del-inventarios.component';
import { IngresosInventarioComponent } from './pages/ingresos-inventario/ingresos-inventario.component';
import { FindIngresoComponent } from './pages/ingresos-inventario/find-ingreso.component';
import { UpdIngresoComponent } from './pages/ingresos-inventario/upd-ingreso.component';
import { DelIngresoComponent } from './pages/ingresos-inventario/del-ingreso.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { FindServicioComponent } from './pages/servicios/find-servicio.component';
import { DelServicioComponent } from './pages/servicios/del-servicio.component';
import { UpdServicioComponent } from './pages/servicios/upd-servicio.component';

const routes:Routes=[
  {
    path:'',
    component:StockManagerPanelComponent,
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard],
    children:[
      {
        path:'createProducto',
        component:ProductosComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'findProducto',
        component:FindProductoComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'deleteProducto',
        component:DelProductoComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'updateProducto',
        component:UpdProductoComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'createInventario',
        component:InventariosComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'findInventario',
        component:FindInventariosComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'updateInventario',
        component:UpdInventariosComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'deleteInventario',
        component:DelInventariosComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },    
      {
        path:'createStock',
        component:IngresosInventarioComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'findStock',
        component:FindIngresoComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'updateStock',
        component:UpdIngresoComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'deleteStock',
        component:DelIngresoComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'createServicio',
        component:ServiciosComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'findServicio',
        component:FindServicioComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'deleteServicio',
        component:DelServicioComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
      {
        path:'updateServicio',
        component:UpdServicioComponent ,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard],
      },
    ]   
  },

]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class StockManagerRoutingModule { }
