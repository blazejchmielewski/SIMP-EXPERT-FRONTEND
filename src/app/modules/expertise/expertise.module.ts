import { NgModule } from '@angular/core';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExpertiseCreateComponent } from './components/expertise/expertise-create/expertise-create.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ExpertiseDetailsComponent } from './components/expertise/expertise-details/expertise-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ExpertiseComponent,
    DashboardComponent,
    ExpertiseCreateComponent,
    ExpertiseDetailsComponent,
  ],
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    BrowserAnimationsModule 
  ],
  exports:[
    ExpertiseComponent,
    DashboardComponent,
    ExpertiseCreateComponent
  ],
})
export class ExpertiseModule { }
