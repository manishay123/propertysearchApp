import { AuthGuardGuard } from './auth-guard.guard';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPropertyComponent } from './add-property/add-property.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: "login", component: LoginComponent
  }, {
    path: "register", component: RegisterComponent
  },
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: "addProperty", component: AddPropertyComponent, canActivate: [AuthGuardGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
