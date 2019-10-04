import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-type',
  templateUrl: './case-type.component.html',
  styleUrls: ['./case-type.component.css']
})
export class CaseTypeComponent implements OnInit {
  caseTypeId = 0;
  showEditDialog = false;
  
  constructor() { }

  ngOnInit() {

  }
  gridActionClick($event){
    this.showEditDialog = false;
    if ($event && $event.action && $event.action.length > 0){
      this.caseTypeId = $event.data.id || 0;
      this.showEditDialog = true;
    }
  }
  closeDialogClick($event){
    this.showEditDialog = false;
    if ($event && $event.data.reload){
      //reload
    }
  }

}
