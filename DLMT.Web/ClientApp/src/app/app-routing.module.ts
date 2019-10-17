import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/authentication/auth-guard.service';
import { DlmtSearchComponent } from './dlmt-search/dlmt-search.component';
import { AuthCallbackComponent } from './authentication/auth-callback/auth-callback.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteNolayoutComponent } from './_layout/site-nolayout/site-nolayout.component';
import { UnauthorizeComponent } from './authentication/unauthorize/unauthorize.component';
import { CaseTypeComponent } from './lookup/case-type/case-type.component';
import { PlanningOfficeComponent } from './lookup/planning-office/planning-office.component';
import { ZoneAreaComponent } from './lookup/zone-area/zone-area.component';
import { AgencyComponent } from './lookup/agency/agency.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, 
    children:[
      { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
      { path: 'dlmtsearch', component: DlmtSearchComponent, canActivate: [AuthGuardService] },
      { path: 'lookup/casetype', component: CaseTypeComponent, canActivate: [AuthGuardService] },
      { path: 'lookup/planningoffice', component: PlanningOfficeComponent, canActivate: [AuthGuardService] },
      { path: 'lookup/zonearea', component: ZoneAreaComponent, canActivate: [AuthGuardService] },
      { path: 'lookup/agency', component: AgencyComponent, canActivate: [AuthGuardService] },
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: '', component: SiteNolayoutComponent, 
    children:[
      { path: 'auth-callback', component: AuthCallbackComponent },
      { path: 'unauthorize', component: UnauthorizeComponent },
      { path: 'error', component: UnauthorizeComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
