import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GestorVeterinariaRoutingModule } from './gestor-veterinaria-routing.module';
import { ChangePassComponent } from './control-panel/change-pass.component';
import { ClientManagerModule } from './client-manager/client-manager.module';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { HomePageComponent } from './home/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagenPipePipe } from './pipes/imagen-pipe.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    ChangePassComponent,
    ControlPanelComponent,
    HomePageComponent,
    ImagenPipePipe
  ],
  imports: [
    CommonModule,
    GestorVeterinariaRoutingModule,
    ClientManagerModule,
    ReactiveFormsModule
  ]
})
export class GestorVeterinariaModule { }
