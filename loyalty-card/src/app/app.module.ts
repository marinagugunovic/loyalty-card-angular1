import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './core/auth/auth.interceptor';

// ✅ standalone komponente
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent
    // ✅ ostaje prazno
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // ✅ standalone komponente idu u imports
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  providers: [
    // ✅ interceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
