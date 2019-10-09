import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CaseTypeDTO, DlmtApi, CaseTypeUpdateRequest } from 'src/app/services/apis/dlmt-api';

@Component({
  selector: 'app-case-type-details',
  templateUrl: './case-type-details.component.html',
  styleUrls: ['./case-type-details.component.css']
})
export class CaseTypeDetailsComponent implements OnInit, OnDestroy {
  
 
  @Input() doc:CaseTypeDTO;
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
  constructor(private formBuilder: FormBuilder, private dlmtApi: DlmtApi) { }

  ngOnInit() {
    this.initFormData();

  }
  ngOnDestroy(): void {
    if (this.updateSub && this.updateSub.hasOwnProperty('unsubscribe')){
      this.updateSub.unsubscribe();
    }
  }
  initFormData(){
    this.title = "New Case Type";
    this.alertText = this.alertTextOrg;
    this.editDataFormGroup = this.formBuilder.group({
      'caseType': new FormControl('', [Validators.required, Validators.maxLength(4)]),
      'description': new FormControl('', [Validators.required])
    });

    if (this.doc && this.doc.id > 0){
      this.title = "Edit";
      this.editDataFormGroup.patchValue(
        {
          'caseType':this.doc.caseType,
          'description':this.doc.description
        }
      );
    }
    else{
      this.doc = new CaseTypeDTO();
      this.doc.id = 0;
    }
    this.isReady = true;
  }
  resetForm(){
    this.doc = new CaseTypeDTO();
    this.isReady = false;
  }
  onSubmit(){
    this.hasError = false;
    this.alertText = this.alertTextOrg;
    if (this.validateForm()){
      this.isLoading = true;
        let insertReq = new CaseTypeUpdateRequest();
        insertReq.caseType = this.generateRequest() as CaseTypeDTO;
        this.updateSub = this.dlmtApi.update(insertReq).subscribe(
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
  generateRequest(): CaseTypeDTO{
    let tempDoc = this.doc;
    tempDoc.description = this.editDataFormGroup.controls['description'].value;
    tempDoc.caseType = this.editDataFormGroup.controls['caseType'].value;
    return tempDoc;
  }
  validateForm():boolean{
    let result = true;
    this.hasError = false;
    result = this.editDataFormGroup.valid;
    if (!result){
      this.hasError = true;
      if (this.editDataFormGroup.controls['caseType'].value.length > 4){
        this.alertText = 'Case type is limitted to 4 characters or less.';
      }
    }
    return result;
  }
  close(){
    this.resetForm();
    this.closeDialogClick.emit({action: 'closeDialog', data: {reload: this.reloadFlag}})
  }

}
