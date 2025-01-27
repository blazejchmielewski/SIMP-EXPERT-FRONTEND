import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { authReducer } from './modules/auth/store/auth.reducer';
import { CommonModule } from '@angular/common';
import { ExpertiseModule } from './modules/expertise/expertise.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    ExpertiseModule,
    StoreModule.forRoot({auth: authReducer}, {}),
    EffectsModule.forRoot([AuthEffects]),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
