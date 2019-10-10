import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ZoneAreaViewComponent } from './zone-area-view/zone-area-view.component';

@Component({
  selector: 'app-zone-area',
  templateUrl: './zone-area.component.html',
  styleUrls: ['./zone-area.component.css']
})
export class ZoneAreaComponent implements OnInit {

  @ViewChild('zoneAreaViewComponent', {static: false}) zoneAreaViewComponent: ZoneAreaViewComponent;

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
        this.zoneAreaViewComponent.searchView(x);
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
      this.zoneAreaViewComponent.reloadView();
    }
  }

}
