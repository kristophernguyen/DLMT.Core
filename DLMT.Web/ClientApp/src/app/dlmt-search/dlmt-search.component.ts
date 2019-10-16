

import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DlmtSearchViewComponent } from './dlmt-search-view/dlmt-search-view.component';

@Component({
  selector: 'app-dlmt-search',
  templateUrl: './dlmt-search.component.html',
  styleUrls: ['./dlmt-search.component.css']
})
export class DlmtSearchComponent implements OnInit {

  @ViewChild('dlmtSearchViewComponent', {static: false}) dlmtSearchViewComponent: DlmtSearchViewComponent;

  doc:any;
  mainDocId:number;
  showEditDialog = false;
  showNewDialog = false;
  searchDataFormGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.mainDocId = 0;
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
        this.dlmtSearchViewComponent.searchView(x);
      }
    )
  }
  gridActionClick($event){
    this.showEditDialog = false;
    this.doc = {};

    if ($event && $event.action && $event.action.length > 0){
      if ($event.data && $event.data.doc){
        this.doc = $event.data.doc;
        this.mainDocId = $event.data.doc.id;
      }
      if ($event.action === 'edit'){
        this.showEditDialog = true;
        this.showNewDialog = false;
      }
      if ($event.action === 'new'){
        this.showNewDialog = true;
        this.showEditDialog = false;
      }
    }
  }
  closeEditDialogClick($event){
    if ($event && $event.data.hasOwnProperty('reload') && $event.data.reload){
      this.dlmtSearchViewComponent.reloadView();
    }
    this.showEditDialog = false;
  }
  closeNewDialogClick($event){
    this.mainDocId = 0;
    this.showNewDialog = false;
    if ($event && $event.data){
      //open details
      if ($event && $event.data.hasOwnProperty('reload') && $event.data.reload){
        this.dlmtSearchViewComponent.reloadView();
      }
      if ($event && $event.data.hasOwnProperty('doc') && $event.data.doc.id > 0){
        this.mainDocId = $event.data.doc.id;
        this.showEditDialog = true;
      }
    }
  }

}
