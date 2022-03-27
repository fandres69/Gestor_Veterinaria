import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'',
   loadChildren:()=>import('./pages/gestor-veterinaria.module').then(m=>m.GestorVeterinariaModule),
   canActivate:[ValidarTokenGuard],
   canLoad:[ValidarTokenGuard]
  },
  
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'404',
    component:ErrorComponent
  },
  {
    path:'**',
    redirectTo:'404'
  }

 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
