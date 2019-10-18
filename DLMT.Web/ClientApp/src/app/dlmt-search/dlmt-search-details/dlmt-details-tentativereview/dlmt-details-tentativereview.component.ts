import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dlmt-details-tentativereview',
  templateUrl: './dlmt-details-tentativereview.component.html',
  styleUrls: ['./dlmt-details-tentativereview.component.css']
})




export class DlmtDetailsTentativereviewComponent implements OnInit {
  hasError = false;
  alertText = "";
  tabId = 1;
  searchDataPlanCheckFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.alertText = "Click add/remove button below to add/remove phases.  Change selected phase using the drop down below.";
    this.searchDataPlanCheckFormGroup = this.formBuilder.group({
      'searchPlanCheckInput': new FormControl()
    });
    this.searchDataPlanCheckFormGroup.controls['searchPlanCheckInput'].valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(
      x=>{
        //this.zoneAreaViewComponent.searchView(x);
      }
    )
  }

}