

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
      }
      if ($event.action === 'edit'){
        this.showEditDialog = true;
      }
    }
  }
  closeDialogClick($event){
    this.showEditDialog = false;
    if ($event && $event.data.reload){
      this.dlmtSearchViewComponent.reloadView();
    }
  }

}
