import { Component, OnInit } from '@angular/core';
import { DlmtCaseDetailsService } from 'src/app/services/case-details/case-details-service-helper';

@Component({
  selector: 'app-dlmt-details-developer',
  templateUrl: './dlmt-details-developer.component.html',
  styleUrls: ['./dlmt-details-developer.component.css']
})
export class DlmtDetailsDeveloperComponent implements OnInit {

  constructor(private dlmtCaseDetailsService: DlmtCaseDetailsService) { }
  hasError = false;
  alertText = "";
  tabId = 1;
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.alertText = "Click add/remove button below to add/remove phases.  Change selected phase using the drop down below.";
  }
  tabSelect($event, tabId){
    $event.preventDefault();
    this.tabId = tabId;
  }

}
