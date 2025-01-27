import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../../../services/admin.service';
import { UserDetails } from '../../../models/user.model';
import { FormService } from '../../../services/form.service';
import { RegisterRequest, UserUpdateRequest } from '../../../models/forms.model';
import { FormControl, FormGroup } from '@angular/forms';
import * as AuthActions from '../../../../auth/store/auth.actions'
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthError } from '../../../../auth/store/auth.selectors';
import { Observable, take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['lp', 'firstname', 'lastname', 'department','status', 'city' , 'actions'];
  users: UserDetails[] = [];
  user!: UserDetails;

  registerForm: FormGroup<RegisterRequest> = this.formService.initRegisterForm();
  userUpdateForm: FormGroup<UserUpdateRequest> = this.formService.initUserUpdateForm();
  notMatchingPasswordsError: string | null = null;
  errorMsg: string | null = null;

  @ViewChild (MatSort) sort !: MatSort;
  @ViewChild (MatPaginator) paginator !: MatPaginator
  dataSource !: MatTableDataSource<UserDetails>

  errorMsg$: Observable<string | null> = this.store.select(selectAuthError);

  constructor(
    private adminService: AdminService
    , private userService: UserService
    , private formService: FormService
    , private store: Store<AppState>
    , private actions$: Actions
    , private router: Router) {}

  // ------------- BASE ------------- 
  ngAfterViewInit(): void {
    this.refreshData();
  }

  refreshData(): void {
  this.adminService.getAllUsers().subscribe({
    next: (users) => {
      this.users = users.slice();
      this.dataSource = new MatTableDataSource<UserDetails>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }});
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  translateStatus(status:boolean): string {
    return status ? "Aktywny" : "Zablokowany";
  }

  navigateToUserEdit(user: UserDetails){
    this.userService.setUser(user);
    this.router.navigate(["/admin/users/edit"])
  }

  // ------------- UNLOCK/BLOCK UŻYTKOWNIKA -------------
  blockUser(user: UserDetails){
    this.adminService.blockUser(user.uuid).subscribe({
      next: (resp) => {
        console.log(resp);
        this.closeDialog();
        this.ngAfterViewInit()
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  unlockUser(user: UserDetails){
    this.adminService.unlockUser(user.uuid).subscribe({
      next: (resp) => {
        console.log(resp);
        this.closeDialog();
        this.ngAfterViewInit()
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  // ------------- DODANIE UŻYTKOWNIKA -------------
  onRegister(){
    const {firstname, lastname, email, password, repeatedPassword} = this.registerForm.getRawValue();
    if(password !== repeatedPassword){
      this.notMatchingPasswordsError = 'Hasła muszą być takie same'
      return;
    }

    this.store.dispatch(
      AuthActions.register({
          registerData: { firstname, lastname, email, password },
          isAdminPanel: true
      })
    );

    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      take(1)
    ).subscribe(action => {
      if(action.type === '[Auth] Register Success'){
        this.closeDialog();
        this.refreshData();
        this.registerForm.reset();
      }
    });
  }

  get controls(){
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl): string{
    return this.formService.getErrorMessage(control);
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  // ------------- OPEN/CLOSE MODALS -------------
  showBlockUserContainer:   boolean = false;
  showUnlockUserContainer:  boolean = false;
  showRegisterContainer:    boolean = false;

  openUnlockUserDialog(user: UserDetails){
    this.showUnlockUserContainer = true;
    this.user = user;
  }

  openBlockUserDialog(user: UserDetails){
    this.showBlockUserContainer = true;
    this.user = user;
  }

  openRegisterDialog(){
    this.showRegisterContainer = true;
  }

  closeDialog(){
    this.showUnlockUserContainer = false;
    this.showBlockUserContainer = false;
    this.showRegisterContainer = false;
  }
}

