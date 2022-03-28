import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from 'src/app/auth/guards/validar-token.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes:Routes=[
  {
    path:'',
    component:DashboardComponent,
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]   
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
