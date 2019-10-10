import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AgencyViewComponent } from './agency-view/agency-view.component';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  @ViewChild('agencyViewComponent', {static: false}) agencyViewComponent: AgencyViewComponent;

  doc:any;
  showEditDialog = false;
  searchDataFormGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.searchDataFormGroup = this.formBuilder.group({
      'searchInput': new FormControl()
    });
    this.searchDataFormGroup.controls['searchInput'].valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(
      x=>{
        this.agencyViewComponent.searchView(x);
      }
    )
  }
  gridActionClick($event){
    this.showEditDialog = false;
    this.doc = {};

    if ($event && $event.action && $event.action.length > 0){
      if ($event.data && $event.data.doc){
        this.doc = $event.data.doc;
      }
      if ($event.action === 'edit'){
        this.showEditDialog = true;
      }
    }
  }
  closeDialogClick($event){
    this.showEditDialog = false;
    if ($event && $event.data.reload){
      this.agencyViewComponent.reloadView();
    }
  }

}
