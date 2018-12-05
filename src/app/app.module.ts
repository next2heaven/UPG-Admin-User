import { AuthGuard } from './services/guards/auth-guard.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// pages
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { NewpassComponent } from './auth/newpass/newpass.component';
import { HeaderComponent } from './core/header/header.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SlidesComponent } from './manage/slides/slides/slides.component';
import { SlideComponent } from './manage/slides/slide/slide.component';
import { MemberComponent } from './core/member/member.component';
import { ManageComponent } from './manage/manage/manage.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotComponent,
    NewpassComponent,
    DashboardComponent,
    HeaderComponent,
    SlidesComponent,
    SlideComponent,
    MemberComponent,
    ManageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
