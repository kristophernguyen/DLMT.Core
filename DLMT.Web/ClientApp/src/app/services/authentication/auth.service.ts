import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { MessageService } from '../common/message-service';
import { IMessage } from 'src/app/model/imessage';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    private manager = new UserManager(getClientSettings());
    private user: User = null;
  
    constructor(private messageService: MessageService) {
      this.manager.getUser().then(user => {
        this.user = user;
      });
    }
  
    isLoggedIn(): boolean {
      return this.user != null && !this.user.expired;
    }
  
    getClaims(): any {
      return this.user.profile;
    }
  
    getAuthorizationHeaderValue(): string {
      return `${this.user.token_type} ${this.user.access_token}`;
    }
  
    startAuthentication(): Promise<void> {
      return this.manager.signinRedirect();
    }
  
    completeAuthentication(): Promise<void> {
      return this.manager.signinRedirectCallback().then(user => {
        this.user = user;
        if (user){
          let msg = {} as IMessage;
          msg.data = {user: user, isAuthenticated: true};
          this.messageService.sendMessage(msg)
        }
        else{
          let msg = {} as IMessage;
          msg.data = {user: null, isAuthenticated: false};
          this.messageService.sendMessage(msg)
        }
      });
    }
  }
  
  export function getClientSettings(): UserManagerSettings {
    return {
      authority: environment.auth_server,
      client_id: 'dlmt.spa.pkce.client',
      redirect_uri: environment.app_uri + '/auth-callback',
      post_logout_redirect_uri: 'http://intranet',
      response_type: "code",
      scope: "openid profile dlmt app_setting_api",
      filterProtocolClaims: true,
      loadUserInfo: true
    };
  }