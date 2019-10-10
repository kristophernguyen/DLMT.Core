import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DlmtSearchComponent } from './dlmt-search/dlmt-search.component';
import { DlmtSearchViewComponent } from './dlmt-search/dlmt-search-view/dlmt-search-view.component';
import { DlmtSearchDetailsComponent } from './dlmt-search/dlmt-search-details/dlmt-search-details.component';
import { DlmtHeaderComponent } from './common/dlmt-header/dlmt-header.component';
import { AppSettingService } from './services/common/app-setting-service';
import { LeftSideMenuComponent } from './common/left-side-menu/left-side-menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { AuthCallbackComponent } from './authentication/auth-callback/auth-callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteNolayoutComponent } from './_layout/site-nolayout/site-nolayout.component';
import { AuthGuardService } from './services/authentication/auth-guard.service';
import { MessageService } from './services/common/message-service';
import { UnauthorizeComponent } from './authentication/unauthorize/unauthorize.component';
import { ErrorComponent } from './common/error/error.component';
import { TokenInterceptor } from './services/common/token-interceptor';
import { AppSettingApiUrl, DlmtApiUrl } from './common/config/app-config';
import { environment } from 'src/environments/environment';
import { AppMenuClient, AppSettingClient, ViewSettingClient } from './services/apis/app-setting-api';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { CaseTypeComponent } from './lookup/case-type/case-type.component';
import { CaseTypeViewComponent } from './lookup/case-type/case-type-view/case-type-view.component';
import { CaseTypeDetailsComponent } from './lookup/case-type/case-type-details/case-type-details.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonModule, DropDownButtonModule } from '@progress/kendo-angular-buttons';
import { WindowModule, DialogModule } from '@progress/kendo-angular-dialog';
import { CaseTypeClient, PlanningOfficeClient, ZoneAreaClient } from './services/apis/dlmt-api';
import { CaseTypeApiHelperService } from './services/grid-helper/casetype-service-helper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PlanningOfficeComponent } from './lookup/planning-office/planning-office.component';
import { PlanningOfficeViewComponent } from './lookup/planning-office/planning-office-view/planning-office-view.component';
import { PlanningOfficeDetailsComponent } from './lookup/planning-office/planning-office-details/planning-office-details.component';
import { PlanningOfficeApiHelperService } from './services/grid-helper/planningoffice-service-helper';
import { ZoneAreaApiHelperService } from './services/grid-helper/zonearea-service-helper';
import { ZoneAreaComponent } from './lookup/zone-area/zone-area.component';
import { ZoneAreaDetailsComponent } from './lookup/zone-area/zone-area-details/zone-area-details.component';
import { ZoneAreaViewComponent } from './lookup/zone-area/zone-area-view/zone-area-view.component';


@NgModule({
  declarations: [
    AppComponent,
    DlmtSearchComponent,
    DlmtSearchViewComponent,
    DlmtSearchDetailsComponent,
    DlmtHeaderComponent,
    LeftSideMenuComponent,
    NotFoundComponent,
    AuthCallbackComponent,
    DashboardComponent,
    SiteLayoutComponent,
    SiteNolayoutComponent,
    UnauthorizeComponent,
    ErrorComponent,
    CaseTypeComponent,
    CaseTypeViewComponent,
    CaseTypeDetailsComponent,
    PlanningOfficeComponent,
    PlanningOfficeViewComponent,
    PlanningOfficeDetailsComponent,
    ZoneAreaComponent,
    ZoneAreaDetailsComponent,
    ZoneAreaViewComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ExcelModule,
    ExcelExportModule,
    GridModule,
    InputsModule,
    ButtonModule,
    DropDownButtonModule,
    WindowModule,
    DialogModule,
    MatProgressBarModule
  ],
  providers: [
    AppSettingService,
    AuthGuardService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    CaseTypeClient, PlanningOfficeClient,ZoneAreaClient,
    AppMenuClient, AppSettingClient, ViewSettingClient,
    CaseTypeApiHelperService,
    PlanningOfficeApiHelperService,
    ZoneAreaApiHelperService,
    { provide: AppSettingApiUrl, useValue:environment.api_url.appsetting },
    { provide: DlmtApiUrl, useValue:environment.api_url.dlmt }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
