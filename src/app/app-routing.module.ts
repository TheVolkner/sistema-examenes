import { StartComponent } from './pages/user/start/start.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { AddExamenPreguntasComponent } from './pages/admin/add-examen-preguntas/add-examen-preguntas.component';
import { ActualizarExamenPreguntasComponent } from './pages/admin/actualizar-examen-preguntas/actualizar-examen-preguntas.component';
import { ViewExamenPreguntasComponent } from './pages/admin/view-examen-preguntas/view-examen-preguntas.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { AddExamenesComponent } from './pages/admin/add-examenes/add-examenes.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NormalGuard } from './services/guards/user.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { ErrorComponent } from './pages/error/error/error.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AdminGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  {path:'admin',component:DashboardComponent, canActivate:[AdminGuard], children:[
    {path:'profile',component:ProfileComponent},
    {path:'',component:WelcomeComponent},
    {path:'categorias',component:ViewCategoriesComponent},
    {path:'add-category',component:AddCategoryComponent},
    {path:'examenes',component:ViewExamenesComponent},
    {path:'add-examen',component:AddExamenesComponent},
    {path:'examen/:id_examen',component:ActualizarExamenComponent},
    {path:'ver-preguntas/:id_examen/:titulo', component:ViewExamenPreguntasComponent},
    {path:'preguntas/:pregunta_id/:id_examen/:titulo',component:ActualizarExamenPreguntasComponent},
    {path:'add-pregunta/:id_examen/:titulo',component:AddExamenPreguntasComponent}
  ]},
  {path:'user-dashboard',component:UserDashboardComponent, canActivate:[NormalGuard],children:[
    {path:'profile',component:ProfileComponent},
    {path:'categoria/:categoria_id',component:LoadExamenComponent},
    {path:'instrucciones/:id_examen',component:InstruccionesComponent},
  ]},
  {path:'start/:id_examen',component:StartComponent,canActivate:[NormalGuard]},
  {path:'**',component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
