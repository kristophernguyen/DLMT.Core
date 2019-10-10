import { Component, OnInit } from '@angular/core';
import { AppMenuClient } from '../services/apis/app-setting-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private appMenuClient: AppMenuClient) { }

  ngOnInit() {
  }
  getToken($event){
    this.appMenuClient.appMenu(1).subscribe(
      x=>{
        console.log(x);
      },
      err =>{

      }
    )
  }
}
