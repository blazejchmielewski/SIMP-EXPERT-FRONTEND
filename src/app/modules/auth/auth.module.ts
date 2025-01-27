import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { PasswordRecoveryFormComponent } from './components/password-recovery-form/password-recovery-form.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccessComponent } from './components/access/access.component';



@NgModule({
  declarations: [
    LoginComponent,
    AccountActivationComponent,
    PasswordRecoveryComponent,
    PasswordRecoveryFormComponent,
    RegisterComponent,
    AccessComponent
  ],
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class AuthModule { }
