import { Component, OnInit } from '@angular/core';
import { AppSettingApi } from '../services/apis/app-setting-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private appSettingApi: AppSettingApi) { }

  ngOnInit() {
  }
  getToken($event){
    this.appSettingApi.appMenu(1).subscribe(
      x=>{
        console.log(x);
      },
      err =>{

      }
    )
  }
}
