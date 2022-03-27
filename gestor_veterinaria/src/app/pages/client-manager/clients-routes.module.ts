import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelClientsComponent } from './pages/panel-clients/panel-clients.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ValidarTokenGuard } from '../../auth/guards/validar-token.guard';
import { FindClientComponent } from './pages/clients/find-client.component';
import { UpdClientComponent } from './pages/clients/upd-client.component';
import { DelClientComponent } from './pages/clients/del-client.component';
import { PetsComponent } from './pages/pets/pets.component';
import { FindPetComponent } from './pages/pets/find-pet.component';
import { UpdPetComponent } from './pages/pets/upd-pet.component';
import { DelPetComponent } from './pages/pets/del-pet.component';

const routes:Routes=[
  {
    path:'',
    component:PanelClientsComponent,
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard],
    children:[
      {
        path:'createClient',
        component:ClientsComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'findClient',
        component:FindClientComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'updateClient',
        component:UpdClientComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'deleteClient',
        component:DelClientComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'createPet',
        component:PetsComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'findPet',
        component:FindPetComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'updatePet',
        component:UpdPetComponent,
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
      },
      {
        path:'deletePet',
        component:DelPetComponent,
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
export class ClientsRoutesModule { }
