import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isAuthenticated: boolean;
  userData: any;
  constructor(public oidcSecurityService: OidcSecurityService
  ) {
    // this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
    //   this.isAuthenticated = auth;
    // });

    // this.oidcSecurityService.getUserData().subscribe(userData => {
    //   this.userData = userData;
    // });
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
          this.doCallbackLogicIfRequired();
      });
    }
  }
  ngOnInit() {
  }
  private doCallbackLogicIfRequired() {
    // Will do a callback, if the url has a code and state parameter.
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
    //look into the auth service and get the current return URL

     this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthenticated = auth;
    });

    this.oidcSecurityService.getUserData().subscribe(userData => {
      this.userData = userData;
      console.log(userData);
    });
  }

}
