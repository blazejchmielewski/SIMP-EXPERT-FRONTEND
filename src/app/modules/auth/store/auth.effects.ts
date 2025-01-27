import { Injectable } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import * as AuthActions from './auth.actions' 
import { catchError, map, of, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthResponse, User } from "../../core/models/auth.model";

@Injectable()
export class AuthEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(action => {
                return this.authService.login(action.loginData).pipe(
                    map((response: AuthResponse) => {
                        const user = new User(
                            response.message.email,
                            response.message.role,
                            response.message.token
                        );
                        this.router.navigate(['/home']);
                        return AuthActions.loginSuccess({ user });
                    }),
                    catchError((error) => {
                        // Obsługa błędnych danych logowania
                        let errorMessage = 'Wystąpił błąd podczas logowania.';
                        if (error.status === 401) {
                            errorMessage = error.error?.message || 'Nieprawidłowe dane logowania.';
                        }
                        return of(AuthActions.loginFailure({ error }));
                    })
                );
            })
        )
    );
    
    autoLogin$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            switchMap(() =>{
                return this.authService.autoLogin().pipe(
                    map((user) => {
                        return AuthActions.autoLoginSuccess({user: {...user.message}})
                    }),
                    catchError((err)=> of(AuthActions.autoLoginFailure()))
                    );
            })
        )
    )

    register$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthActions.register),
            switchMap(action =>{
                return this.authService.register(action.registerData).pipe(
                    map(() => {
                        if(!action.isAdminPanel){
                            this.router.navigate(['/logowanie']);
                        }
                        //this.notifierService.notify('success', 'Na adres e-mail została wysłana wiadomość z linkiem aktywacyjnym')
                        console.log(AuthActions.registerSuccess())
                        return AuthActions.registerSuccess();
                    }),
                catchError((err) => {
                    return of(AuthActions.registerFailure({error: err}))}
                )
                );
            })
        ));
        
    addUser$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthActions.addUser),
            switchMap(action =>{
                return this.authService.register(action.registerData).pipe(
                    map(() => {
                        this.router.navigate(['/users']);
                        //this.notifierService.notify('success', 'Dodano konto użtytkownika')
                        return AuthActions.addUserSuccess();
                    }),
                catchError((err) => {
                    return of(AuthActions.addUserFailure({error: err}))}
                )
                );
            })
        ));

        logout$ = createEffect(()=>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                switchMap(() => {
                    return this.authService.logout().pipe(
                        map((user) => {
                            this.router.navigate(['/logowanie']);
                            //this.notifierService.notify('success', 'Wylogowano się');
                            return AuthActions.logoutSuccess();
                        }),
                        catchError((err) => {
                            //this.notifierService.notify('warning', err)
                            return of(AuthActions.logoutFailure())}
                        ));
                })
            ))

    constructor(private actions$: Actions, 
                private authService: AuthService,
                private router: Router,
                ){}


}