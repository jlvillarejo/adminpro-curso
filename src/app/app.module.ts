import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { APP_ROUTES } from './app.routes';

// Módulos
import { PagesModule } from './pages/pages.module';

// Servicios
// No es necesario proveer los servicios en el módulo a partir de la versión 7 de Angular
// import { ServiceModule } from './services/service.module';


// Componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ServiceModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
