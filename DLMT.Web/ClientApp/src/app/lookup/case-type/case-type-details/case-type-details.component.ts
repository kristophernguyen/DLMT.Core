import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-case-type-details',
  templateUrl: './case-type-details.component.html',
  styleUrls: ['./case-type-details.component.css']
})
export class CaseTypeDetailsComponent implements OnInit {
  @Input('Id') id:number;
  @Output() closeDialogClick = new EventEmitter();

  isReady = false;
  title: string;
  windowWidth = 500;
  windowHeight = 400;
  reloadFlag = false;
  actionsLayout: string = 'normal';

  constructor() { }

  ngOnInit() {
    this.initFormData();

  }
  initFormData(){
    this.title = "New Case Type";
    if (this.id){
      this.title = "Edit";
      
    }
    else{
      this.isReady = true;
    }
  }
  close(){
    this.closeDialogClick.emit({action: 'closeDialog', data: {reload: this.reloadFlag}})
  }

}
