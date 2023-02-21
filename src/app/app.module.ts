import { PreguntasService } from './services/preguntas.service';
import { ExamenService } from './services/examen.service';
import { CategoriaService } from './services/categoria.service';
import { NormalGuard } from './services/guards/user.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { ErrorComponent } from './pages/error/error/error.component';
import { RouterModule } from '@angular/router';
import { AuthIncerceptorProviders } from './services/auth.interceptor';
import { LoginService} from './services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENTES DE ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//COMPONENTES EXTERNOS PARA ANGULAR
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

//COMPONENTES DE LA APLICACION
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SideboardComponent } from './pages/admin/sideboard/sideboard.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddExamenesComponent } from './pages/admin/add-examenes/add-examenes.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './pages/admin/view-examen-preguntas/view-examen-preguntas.component';
import { ActualizarExamenPreguntasComponent } from './pages/admin/actualizar-examen-preguntas/actualizar-examen-preguntas.component';
import { AddExamenPreguntasComponent } from './pages/admin/add-examen-preguntas/add-examen-preguntas.component';
import { UserSideboardComponent } from './pages/user/user-sideboard/user-sideboard.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { StartComponent } from './pages/user/start/start.component';
import { FooterComponent } from './componentes/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ErrorComponent,
    ProfileComponent,
    SideboardComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewExamenesComponent,
    AddExamenesComponent,
    ActualizarExamenComponent,
    ViewExamenPreguntasComponent,
    ActualizarExamenPreguntasComponent,
    AddExamenPreguntasComponent,
    UserSideboardComponent,
    LoadExamenComponent,
    InstruccionesComponent,
    StartComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    })

  ],
  providers: [UserService,HttpClient,LoginService,AuthIncerceptorProviders,AdminGuard,NormalGuard,
    CategoriaService,ExamenService,PreguntasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
