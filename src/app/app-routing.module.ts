import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* import { HomeComponent } from './core/components/home/home.component'; */
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { LandingComponent } from './core/components/landing/landing.component';


const routes: Routes = [
/*   {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]}, */
  {path: 'index', component: LandingComponent},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path: '**', redirectTo: 'index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
