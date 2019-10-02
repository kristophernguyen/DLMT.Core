import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private authService: AuthService;
    constructor(private injector: Injector) {
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.getAuthService();
        if (this.authService.isLoggedIn()) {
            let token = this.authService.getAuthorizationHeaderValue();
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next.handle(request);
    }

    getAuthService(): AuthService {
        if (typeof this.authService === 'undefined') {
            this.authService = this.injector.get(AuthService);
        }
        return this.authService;
    }
}