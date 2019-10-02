import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-dlmt-header',
  templateUrl: './dlmt-header.component.html',
  styleUrls: ['./dlmt-header.component.css']
})
export class DlmtHeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();
  fullName:string;
  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    let tempClaims = this.authService.getClaims();
    if (tempClaims && tempClaims.family_name && tempClaims.given_name){
      this.fullName = tempClaims.given_name + " " + tempClaims.family_name;
    }
  }
  
  toggleSideMenu($event){
    $event.preventDefault();
    this.toggleMenu.emit({});
  }

}
