import { Component, OnInit } from '@angular/core';
import { DlmtCaseDetailsService } from 'src/app/services/case-details/case-details-service-helper';

@Component({
  selector: 'app-dlmt-details-casephase',
  templateUrl: './dlmt-details-casephase.component.html',
  styleUrls: ['./dlmt-details-casephase.component.css']
})
export class DlmtDetailsCasephaseComponent implements OnInit {

  constructor(private dlmtCaseDetailsService: DlmtCaseDetailsService) { }
  hasError = false;
  alertText = "";
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.alertText = "Click add/remove button below to add/remove phases.  Change selected phase using the drop down below.";
  }

}
