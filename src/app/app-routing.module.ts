import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { AccountActivationComponent } from './modules/auth/components/account-activation/account-activation.component';
import { PasswordRecoveryComponent } from './modules/auth/components/password-recovery/password-recovery.component';
import { PasswordRecoveryFormComponent } from './modules/auth/components/password-recovery-form/password-recovery-form.component';
import { UnauthGuard } from './modules/core/guards/unauth.guard';
import { UsersComponent } from './modules/core/components/admin/users/users.component';
import { UserDetailsComponent } from './modules/core/components/user/user-details/user-details.component';
import { HomeComponent } from './modules/core/components/home/home.component';
import { AdminComponent } from './modules/core/components/admin/admin.component';
import { ExpertiseComponent } from './modules/expertise/components/expertise/expertise.component';
import { DashboardComponent } from './modules/expertise/components/dashboard/dashboard.component';
import { ExpertiseCreateComponent } from './modules/expertise/components/expertise/expertise-create/expertise-create.component';
import { ExpertiseDetailsComponent } from './modules/expertise/components/expertise/expertise-details/expertise-details.component';
import { AccessComponent } from './modules/auth/components/access/access.component';
import { ActivityComponent } from './modules/core/components/user/activity/activity.component';
import { UserEditComponent } from './modules/core/components/user/user-edit/user-edit.component';
import { EditComponent } from './modules/core/components/admin/users/edit/edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'no-access', component: AccessComponent},
  
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegisterComponent,  },
  { path: 'aktywuj/:uid', component: AccountActivationComponent },
  { path: 'odzyskaj-haslo', component: PasswordRecoveryComponent },
  { path: 'odzyskaj-haslo/:uuid', component: PasswordRecoveryFormComponent },
  
  { path: 'home', component: HomeComponent, canActivate: [UnauthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UnauthGuard]},

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'admin/users/edit', component: EditComponent, canActivate: [AuthGuard]},

  { path: 'profile', component: UserDetailsComponent, canActivate: [UnauthGuard]},
  { path: 'profile/edit', component: UserEditComponent, canActivate: [UnauthGuard]},
  { path: 'profile/activity', component: ActivityComponent, canActivate: [UnauthGuard]},
  
  { path: 'expertise', component: ExpertiseComponent, canActivate: [UnauthGuard]},
  { path: 'expertise/create', component: ExpertiseCreateComponent, canActivate: [UnauthGuard]},
  { path: 'expertise/details/:uuid', component: ExpertiseDetailsComponent, canActivate: [UnauthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
