import { DraggableScrollContainerDirective } from 'angular-draggable-droppable/lib/draggable-scroll-container.directive';
import { DraggableDirective } from 'angular-draggable-droppable/lib/draggable.directive';
import { ErrorHandlerService } from './services/core/error-handler.service';
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
import { MemberComponent } from './core/member/member.component';
import { ManageComponent } from './manage/manage/manage.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AccountComponent } from './core/account/account.component';
import { ResetComponent } from './core/account/reset/reset.component';
import { BillingComponent } from './core/account/billing/billing.component';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { SlidesComponent } from './manage/slides/slides/slides.component';
import { SlideComponent } from './manage/slides/slide/slide.component';
import { SlidePropsComponent } from './manage/slides/slide-props/slide-props.component';
import { SlideDetailsComponent } from './manage/slides/slide-details/slide-details.component';
import { SlideLayersComponent } from './manage/slides/slide-layers/slide-layers.component';
import { SlideTimelineComponent } from './manage/slides/slide-timeline/slide-timeline.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { SlideAnimationComponent } from './manage/slides/slide-animation/slide-animation.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotComponent,
    NewpassComponent,
    DashboardComponent,
    HeaderComponent,
    MemberComponent,
    ManageComponent,
    AccountComponent,
    ResetComponent,
    BillingComponent,
    SlidesComponent,
    SlideComponent,
    SlidePropsComponent,
    SlideDetailsComponent,
    SlideLayersComponent,
    SlideTimelineComponent,
    SlideAnimationComponent
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
    NgxDatatableModule,
    UcWidgetModule,
    DragAndDropModule
  ],
  providers: [
		AuthGuard,
		ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
