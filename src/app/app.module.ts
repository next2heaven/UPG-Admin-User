import { environment } from '../environments/environment';
import { FormElementsModule } from './modules/form-elements/form-elements.module';
import { MaterialLayoutModule } from './modules/material-layout/material-layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { NewpassComponent } from './auth/newpass/newpass.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotComponent,
    NewpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormElementsModule,
    MaterialLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
