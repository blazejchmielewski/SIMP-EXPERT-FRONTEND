import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './store/app.reducer';
import * as AuthActions from '../app/modules/auth/store/auth.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SIMP-EXPERT24';

  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isPasswordRecoveryPage: boolean = false;
  isPasswordRecoveryFormPage: boolean = false;
  isNoAccessPage: boolean = false;
  isDefaultPage: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isDefaultPage = event.url === '/';
        this.isLoginPage = event.url === '/logowanie';
        this.isRegisterPage = event.url === '/rejestracja';
        this.isPasswordRecoveryPage = event.url === '/odzyskaj-haslo';
        this.isNoAccessPage = event.url === '/no-access';
        this.isPasswordRecoveryFormPage = event.url.includes('/odzyskaj-haslo/');
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
