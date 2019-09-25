import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './AuthService';

@Injectable()
export class AuthorizationGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private oidcSecurityService: OidcSecurityService, private authService:AuthService) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
          return this.oidcSecurityService.getIsAuthorized().pipe(
            map((isAuthorized: boolean) => {
                if (isAuthorized) {
                    return true;
                }
                this.authService.setReturnUrl(state.url);
                this.oidcSecurityService.authorize();
                return false;
            })
        );  
    }

    canLoad(state: Route): Observable<boolean> {
        return this.checkUser();
    }

    private checkUser(): Observable<boolean> {
        return this.oidcSecurityService.getIsAuthorized().pipe(
            map((isAuthorized: boolean) => {
                if (!isAuthorized) {
                    this.router.navigate(['/unauthorized']);
                    return false;
                }
                return true;
            })
        );
    }
}