import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../auth/store/auth.actions';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import { User } from '../../models/auth.model';
import { selectAuthUser } from 'src/app/modules/auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isSidebarClosed = false;
  user$: Observable<User | null> = this.store.select(selectAuthUser);

  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  isAdmin(user: User): boolean {
    return user?.role === 'ADMIN';
  }
  //////

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.closeAllSubMenus();
  }

  toggleSubMenu(button: HTMLElement): void {
    const submenu = button.nextElementSibling as HTMLElement;

    if (!submenu?.classList.contains('show')) {
      this.closeAllSubMenus();
      
    }
    submenu?.classList.toggle('show');
    button.classList.toggle('rotate');

    if (this.isSidebarClosed) {
      this.isSidebarClosed = false;
    }
  }

  closeAllSubMenus(): void {
    const sidebar = document.getElementById('sidebar');
    
  
    if (!sidebar) return;

    Array.from(sidebar.getElementsByClassName('show')).forEach((ul) => {
      ul.classList.remove('show');
      (ul.previousElementSibling as HTMLElement).classList.remove('rotate');
    });
  }

}