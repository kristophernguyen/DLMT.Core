import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-dlmt-header',
  templateUrl: './dlmt-header.component.html',
  styleUrls: ['./dlmt-header.component.css']
})
export class DlmtHeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();
  constructor(public oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
  }
  login($event) {
    $event.preventDefault();
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
  toggleSideMenu($event){
    $event.preventDefault();
    this.toggleMenu.emit({});
  }

}
