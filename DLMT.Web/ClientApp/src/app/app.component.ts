import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { AppSettingService } from './services/common/app-setting-service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'DLMT';
  isMenuOpen = true;
  isAuthenticated: boolean;
  userData: any;
  constructor(
    public oidcSecurityService: OidcSecurityService,
    private appSettingService: AppSettingService,
    private renderer: Renderer2
  ) {
    // if (this.oidcSecurityService.moduleSetup) {
    //   this.doCallbackLogicIfRequired();
    // } else {
    //   this.oidcSecurityService.onModuleSetup.subscribe(() => {
    //     this.doCallbackLogicIfRequired();
    //   });
    // }
  }
  ngOnInit() {
    // this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
    //   this.isAuthenticated = auth;
    // });

    // this.oidcSecurityService.getUserData().subscribe(userData => {
    //   this.userData = userData;
    // });
  }

  ngOnDestroy(): void { }

  // private doCallbackLogicIfRequired() {
  //   // Will do a callback, if the url has a code and state parameter.
  //   this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  // }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.appSettingService.setMenuState(this.isMenuOpen);
    if (window.matchMedia('(min-width:600px)').matches) {
      if (this.isMenuOpen) {
        this.renderer.addClass(document.body, 'show-sidebar');
        this.renderer.removeClass(document.body, 'hide-sidebar');
      }
      else {
        this.renderer.addClass(document.body, 'hide-sidebar');
        this.renderer.removeClass(document.body, 'show-sidebar');
      }
    }
  }
}
