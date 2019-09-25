import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DlmtSearchComponent } from './dlmt-search/dlmt-search.component';
import { DlmtSearchViewComponent } from './dlmt-search/dlmt-search-view/dlmt-search-view.component';
import { DlmtSearchDetailsComponent } from './dlmt-search/dlmt-search-details/dlmt-search-details.component';
import { DlmtHeaderComponent } from './common/dlmt-header/dlmt-header.component';
import { AppSettingService } from './services/common/app-setting-service';
import { LeftSideMenuComponent } from './common/left-side-menu/left-side-menu.component';
import { AuthModule, ConfigResult, OidcConfigService, OidcSecurityService, OpenIdConfiguration, LoggerService, AuthWellKnownEndpoints } from 'angular-auth-oidc-client';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignoutComponent } from './authentication/signout/signout.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { SecurepageComponent } from './securepage/securepage.component';
import { AuthService } from './authentication/AuthService';
import { AuthorizationGuard } from './authentication/AuthorizationGuard';

const oidc_configuration = 'assets/auth.clientConfiguration.json';
// if your config is on server side
// const oidc_configuration = ${window.location.origin}/api/ClientAppSettings

export function loadConfig(oidcConfigService: OidcConfigService) {
    return () => oidcConfigService.load(oidc_configuration);
}

@NgModule({
  declarations: [
    AppComponent,
    DlmtSearchComponent,
    DlmtSearchViewComponent,
    DlmtSearchDetailsComponent,
    DlmtHeaderComponent,
    LeftSideMenuComponent,
    SigninComponent,
    SignoutComponent,
    NotFoundComponent,
    SecurepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthorizationGuard,
    AuthService,
    OidcSecurityService,
    OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [OidcConfigService],
            multi: true,
        },
    LoggerService,
    AppSettingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {

        // Use the configResult to set the configurations
  
        // const config: OpenIdConfiguration = {
        //     stsServer: configResult.customConfig.stsServer,
        //     redirect_url: configResult.customConfig.redirect_url,
        //     client_id: configResult.customConfig.client_id,
        //     scope: configResult.customConfig.scope,
        //     response_type: configResult.customConfig.response_type,
        //     silent_renew: configResult.customConfig.silent_renew,
        //     silent_renew_url: 'http://localhost:4200/silent-renew.html',
        //     log_console_debug_active: configResult.customConfig.log_console_debug_active
        // };
        const config: OpenIdConfiguration = {
          stsServer: "https://localhost:44306",
          redirect_url: "http://localhost:4200/authentication/signin",
          client_id: "spa.pkce.client",
          scope: "openid profile pkce_client",
          response_type: "code",
          silent_renew: false,
          silent_renew_url: 'http://localhost:4200/silent-renew.html'
      };
    //   const authWellKnownEndpoints: AuthWellKnownEndpoints = {
    //     issuer: 'https://localhost:44306/.well-known/openid-configuration/jwks',
    //     authorization_endpoint: 'https://localhost:44306/connect/authorize',
    //     token_endpoint: 'https://localhost:44306/connect/token',
    //     userinfo_endpoint: 'https://localhost:44306/connect/userinfo',
    //     end_session_endpoint: 'https://localhost:44306/connect/endsession',
    //     check_session_iframe: 'https://localhost:44306/connect/checksession',
    //     revocation_endpoint: 'https://localhost:44306/connect/revocation',
    //     introspection_endpoint: 'https://localhost:44306/connect/introspect',
    // };
        this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
}
}
