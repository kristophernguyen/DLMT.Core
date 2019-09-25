import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-securepage',
  templateUrl: './securepage.component.html',
  styleUrls: ['./securepage.component.css']
})
export class SecurepageComponent implements OnInit {
  isAuthenticated: boolean;
  userData:any;

  constructor(public oidcSecurityService: OidcSecurityService) { 
       this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthenticated = auth;
    });

    this.oidcSecurityService.getUserData().subscribe(userData => {
      this.userData = userData;
    });
  }

  ngOnInit() {
  }

}
