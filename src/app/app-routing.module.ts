import { BillingComponent } from './core/account/billing/billing.component';
import { AccountComponent } from './core/account/account.component';
import { ManageComponent } from './manage/manage/manage.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NewpassComponent } from './auth/newpass/newpass.component';
import { SlidesComponent } from './manage/slides/slides/slides.component';
import { SlideComponent } from './manage/slides/slide/slide.component';
import { MemberComponent } from './core/member/member.component';
import { ResetComponent } from './core/account/reset/reset.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component:LoginComponent },
    { path: 'login/forgot', component:ForgotComponent },
    { path: 'login/reset', component:NewpassComponent },
    { path: 'register', component:RegisterComponent },

    { path: '',
      component: MemberComponent,
      canActivate:[AuthGuard],
      children: [
        { path: '', component: DashboardComponent, canActivate:[AuthGuard] },
        { path: 'manage',
          component: ManageComponent,
          canActivate:[AuthGuard],
          children: [
            { path: '', redirectTo: '/', pathMatch:'full' },
            { path: 'slides', component: SlidesComponent, canActivate:[AuthGuard] },
            { path: 'slides/slide/:id', component: SlideComponent, canActivate:[AuthGuard] },
          ]
        }, 
        { path: 'account', component: AccountComponent, canActivate:[AuthGuard],
          children: [
            { path: '', component: AccountComponent, canActivate:[AuthGuard]  },
            { path: 'reset', component: ResetComponent, canActivate:[AuthGuard]  },
            { path: 'billing', component: BillingComponent, canActivate:[AuthGuard]  },
          ]
        },
      ]
    },
   

    //{ path: 'topic/:topicID', component:  }
  ], { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
