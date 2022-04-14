import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformesRoutingModule } from './informes-routing.module';
import { VentasComponent } from './ventas/ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarrasComponent } from './dashboard/barras/barras.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PastelComponent } from './dashboard/pastel/pastel.component';
import { LinesComponent } from './dashboard/lines/lines.component';
import { InformesPipe } from './pipes/informes.pipe';
import { MaterialModule } from '../material/material.module';
import { VentasServiciosComponent } from './ventas-servicios/ventas-servicios.component';
import { GeneralComponent } from './general/general.component';


@NgModule({
  declarations: [
    DashboardComponent,
    VentasComponent,
    BarrasComponent,
    PastelComponent,
    LinesComponent,
    InformesPipe,
    VentasServiciosComponent,
    GeneralComponent,
    
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    MaterialModule,

  ],
  exports:[
  ]
})
export class InformesModule { }
