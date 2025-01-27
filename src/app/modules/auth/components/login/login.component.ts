import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import { selectAuthError, selectAuthLoading } from '../../store/auth.selectors';
import * as AuthActions from '../../store/auth.actions'
import { AppState } from 'src/app/store/app.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnDestroy {
  loginForm: FormGroup<LoginRequest> = this.formService.initLoginForm();
  errorMsg$: Observable<string | null> = this.store.select(selectAuthError);
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);

  constructor(private formService: FormService, private store: Store<AppState>) {}

  get controls() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        AuthActions.login({ loginData: this.loginForm.getRawValue() })
      );
    }
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}