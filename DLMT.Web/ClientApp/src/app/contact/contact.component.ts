

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContactViewComponent } from './contact-view/contact-view.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('contactViewComponent', { static: false }) contactViewComponent: ContactViewComponent;

  doc: any;
  showEditDialog = false;
  searchDataFormGroup: FormGroup;
  searchTypes: any[] = [];
  selectedSearchType:any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.searchDataFormGroup = this.formBuilder.group({
      'searchInput': new FormControl(),
      'searchType': new FormControl(1)
    });
    this.searchTypes = [
      { text: 'Developer', value: 1, propertyName: 'Developer' },
      { text: 'External Engineer', value: 2, propertyName: 'ExternalEngineer' },
      { text: 'Consultant', value: 3, propertyName: 'Consultant' }
    ];

    this.selectedSearchType = this.searchTypes[0];
    this.searchDataFormGroup.controls['searchInput'].valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(
        x => {
          this.contactViewComponent.searchView(x);
        }
      )
  }
  gridActionClick($event) {
    this.showEditDialog = false;
    this.doc = {};

    if ($event && $event.action && $event.action.length > 0) {
      if ($event.data && $event.data.doc) {
        this.doc = $event.data.doc;
      }
      if ($event.action === 'edit') {
        this.showEditDialog = true;
      }
    }
  }
  searchTypeSelectionChange($event) {
    if ($event && $event.value > 0) {
      this.selectedSearchType = $event;
      //reload
      this.contactViewComponent.reloadView()
    }
  }
  closeDialogClick($event) {
    this.showEditDialog = false;
    if ($event && $event.data.reload) {
      this.contactViewComponent.reloadView();
    }
  }

}
