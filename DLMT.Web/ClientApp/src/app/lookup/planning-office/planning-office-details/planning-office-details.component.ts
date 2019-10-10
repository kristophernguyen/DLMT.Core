import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CaseTypeDTO, CaseTypeClient, CaseTypeUpdateRequest, PlanningOfficeDTO, PlanningOfficeClient, PlanningOfficeUpdateRequest } from 'src/app/services/apis/dlmt-api';

@Component({
  selector: 'app-planning-office-details',
  templateUrl: './planning-office-details.component.html',
  styleUrls: ['./planning-office-details.component.css']
})
export class PlanningOfficeDetailsComponent implements OnInit, OnDestroy {
  
 
  @Input() doc:PlanningOfficeDTO;
  @Output() closeDialogClick = new EventEmitter();

  isReady = false;
  isLoading = false;
  title: string;
  alertTextOrg = "Please enter all required field";
  alertText:string;
  hasError = false;
  windowWidth = 500;
  windowHeight = 400;
  reloadFlag = false;
  actionsLayout: string = 'normal';
  editDataFormGroup: FormGroup;
  updateSub:any;
  constructor(private formBuilder: FormBuilder, private planningOfficeClient: PlanningOfficeClient) { }

  ngOnInit() {
    this.initFormData();

  }
  ngOnDestroy(): void {
    if (this.updateSub && this.updateSub.hasOwnProperty('unsubscribe')){
      this.updateSub.unsubscribe();
    }
  }
  initFormData(){
    this.title = "New Planning Office";
    this.alertText = this.alertTextOrg;
    this.editDataFormGroup = this.formBuilder.group({
      'officeName': new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    if (this.doc && this.doc.id > 0){
      this.title = "Edit";
      this.editDataFormGroup.patchValue(
        {
          'officeName':this.doc.officeName
        }
      );
    }
    else{
      this.doc = new PlanningOfficeDTO();
      this.doc.id = 0;
    }
    this.isReady = true;
  }
  resetForm(){
    this.doc = new PlanningOfficeDTO();
    this.isReady = false;
  }
  onSubmit(){
    this.hasError = false;
    this.alertText = this.alertTextOrg;
    if (this.validateForm()){
      this.isLoading = true;
        let insertReq = new PlanningOfficeUpdateRequest();
        insertReq.planningOffice = this.generateRequest() as PlanningOfficeDTO;
        this.updateSub = this.planningOfficeClient.update(insertReq).subscribe(
          x=>{
            this.isLoading = false;
            if (!x.hasError){
              this.reloadFlag = true;
              this.close();
            }
            else{
              this.alertText = x.errorMsgs && x.errorMsgs.length > 0 ? x.errorMsgs[0].errorMsg : "Unexpected exception: contact admin for details";
              this.hasError = x.hasError;
            }
          },
          err=>{
            this.isLoading = false;
            this.hasError = true;
            this.alertText = "Unexpected exception: contact admin for details";
          }
        );
    }
  }
  generateRequest(): PlanningOfficeDTO{
    let tempDoc = this.doc;
    let tempVal = this.editDataFormGroup.controls['officeName'].value || '';
    tempDoc.officeName =  tempVal.trim();
    return tempDoc;
  }
  validateForm():boolean{
    let result = true;
    this.hasError = false;
    result = this.editDataFormGroup.valid;
    if (!result){
      this.hasError = true;
      let tempVal = this.editDataFormGroup.controls['officeName'].value || '';
      if (tempVal.trim().length <= 0){
        this.alertText = 'Office name is required';
      }
      else if (tempVal.trim().length > 100){
        this.alertText = 'Office name is limitted to 100 characters or less.'
      }
    }
    return result;
  }
  close(){
    this.resetForm();
    this.closeDialogClick.emit({action: 'closeDialog', data: {reload: this.reloadFlag}})
  }

}
