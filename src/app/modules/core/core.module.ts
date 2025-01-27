import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ActivityComponent } from './components/user/activity/activity.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { EditComponent } from './components/admin/users/edit/edit.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SpinnerComponent,
    AdminComponent,
    UsersComponent,
    UserDetailsComponent,
    ActivityComponent,
    UserEditComponent,
    EditComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  exports:[
    HeaderComponent,
    HomeComponent,
    SpinnerComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
    ],
})
export class CoreModule { }
