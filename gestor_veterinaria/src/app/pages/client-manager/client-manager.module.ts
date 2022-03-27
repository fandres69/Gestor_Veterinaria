import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelClientsComponent } from './pages/panel-clients/panel-clients.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { PetsComponent } from './pages/pets/pets.component';
import { ClientsRoutesModule } from './clients-routes.module';
import { DelClientComponent } from './pages/clients/del-client.component';
import { FindClientComponent } from './pages/clients/find-client.component';
import { UpdClientComponent } from './pages/clients/upd-client.component';
import { FindPetComponent } from './pages/pets/find-pet.component';
import { UpdPetComponent } from './pages/pets/upd-pet.component';
import { DelPetComponent } from './pages/pets/del-pet.component';



@NgModule({
  declarations: [
    PanelClientsComponent,
    ClientsComponent,
    FindClientComponent,
    UpdClientComponent,
    DelClientComponent,
    PetsComponent,
    FindPetComponent,
    UpdPetComponent,
    DelPetComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutesModule
  ]
})
export class ClientManagerModule { }
