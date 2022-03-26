import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GestorVeterinariaRoutingModule } from './gestor-veterinaria-routing.module';
import { ChangePassComponent } from './control-panel/change-pass.component';
import { ClientManagerModule } from './client-manager/client-manager.module';



@NgModule({
  declarations: [
    HomeComponent,
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    GestorVeterinariaRoutingModule,
    ClientManagerModule
  ]
})
export class GestorVeterinariaModule { }
