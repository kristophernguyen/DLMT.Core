import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AgencyDTO, DlmtCaseSummaryDTO, DlmtCaseClient, DlmtCaseSummaryUpdateRequest } from 'src/app/services/apis/dlmt-api';



@Component({
  selector: 'app-dlmt-case-new',
  templateUrl: './dlmt-case-new.component.html',
  styleUrls: ['./dlmt-case-new.component.css']
})
export class DlmtCaseNewComponent implements OnInit, OnDestroy {
  
  @Output() closeDialogClick = new EventEmitter();

  isReady = false;
  isLoading = false;
  title: string;
  alertTextOrg = "Please enter all required field";
  alertText:string;
  hasError = false;
  windowWidth = 500;
  windowHeight = 600;
  reloadFlag = false;
  actionsLayout: string = 'normal';
  editDataFormGroup: FormGroup;
  updateSub:any;
  agencyList: any[] = [];
  caseTypeList: any[] = [];
  areaList: any[] = [];
  planningOfficeList: any[] = [];
  constructor(private formBuilder: FormBuilder, private dlmtCaseClient: DlmtCaseClient) { }

  ngOnInit() {
    this.initFormData();

  }
  ngOnDestroy(): void {
    if (this.updateSub && this.updateSub.hasOwnProperty('unsubscribe')){
      this.updateSub.unsubscribe();
    }
  }
  initFormData(){
    this.title = "New Case";
    this.alertText = this.alertTextOrg;
    this.editDataFormGroup = this.formBuilder.group({
      'caseType': new FormControl('', [Validators.required]),
      'caseNumber': new FormControl('', [Validators.required]),
      'agency': new FormControl('', [Validators.required]),
      'area': new FormControl('', [Validators.required]),
      'planningOffice': new FormControl('', [Validators.required])
    });

    this.dlmtCaseClient.summaryformlookup().subscribe(
      x=>{
        
        if (x && x.agencies){
          for(let i = 0; i < x.agencies.length; i++){
            let tempAgency = x.agencies[i];
            this.agencyList.push({id: tempAgency.id, name: tempAgency.name});
          }
        }
        if (x && x.caseTypes){
          for(let i = 0; i < x.caseTypes.length; i++){
            let tempCaseType = x.caseTypes[i];
            this.caseTypeList.push({id: tempCaseType.id, name: tempCaseType.caseType});
          }
        }
        if (x && x.zoneAreas){
          for(let i = 0; i < x.zoneAreas.length; i++){
            let tempZone = x.zoneAreas[i];
            this.areaList.push({id: tempZone.id, name: tempZone.name});
          }
        }
        if (x && x.planningOffices){
          for(let i = 0; i < x.planningOffices.length; i++){
            let tempOffice = x.planningOffices[i];
            this.planningOfficeList.push({id: tempOffice.id, name: tempOffice.officeName});
          }
        }
        this.isReady = true;
      },
      ()=>{

      }
    )
    
  }
  resetForm(){
    this.isReady = false;
  }
  onSubmit(){
    this.hasError = false;
    this.alertText = this.alertTextOrg;
    if (this.validateForm()){
      this.isLoading = true;
        let insertReq = new DlmtCaseSummaryUpdateRequest();
        insertReq.caseSummary = this.generateRequest() as DlmtCaseSummaryDTO;
        this.updateSub = this.dlmtCaseClient.casesummaryupdate(insertReq).subscribe(
          x=>{
            this.isLoading = false;
            if (!x.hasError){
              this.reloadFlag = true;
              this.close(x.data);
            }
            else{
              this.alertText = x.errorMsgs && x.errorMsgs.length > 0 ? x.errorMsgs[0].errorMsg : "Unexpected exception: contact admin for details";
              this.hasError = x.hasError;
            }
          },
          ()=>{
            this.isLoading = false;
            this.hasError = true;
            this.alertText = "Unexpected exception: contact admin for details";
          }
        );
    }
  }
  generateRequest(): DlmtCaseSummaryDTO{
    let tempDoc = new DlmtCaseSummaryDTO();
    let tempCaseNumberVal = this.editDataFormGroup.controls['caseNumber'].value || '';
    let tempCaseTypeIdVal = this.editDataFormGroup.controls['caseType'].value || 0;
    let tempAgencyIdVal = this.editDataFormGroup.controls['agency'].value || 0;
    let tempAreaIdVal = this.editDataFormGroup.controls['area'].value || 0;
    let tempPlanningOfficeIdVal = this.editDataFormGroup.controls['planningOffice'].value || 0;
    tempDoc.id = 0;
    tempDoc.caseNumber = tempCaseNumberVal;
    tempDoc.caseTypeId = tempCaseTypeIdVal;
    tempDoc.agencyId = tempAgencyIdVal;
    tempDoc.zoneAreaId = tempAreaIdVal;
    tempDoc.planningOfficeId = tempPlanningOfficeIdVal;
    return tempDoc;
  }
  validateForm():boolean{
    let result = true;
    this.hasError = false;
    result = this.editDataFormGroup.valid;
    if (!result){
      this.hasError = true;
      let tempVal = this.editDataFormGroup.controls['caseNumber'].value || '';
      if (tempVal.trim().length <= 0){
        this.alertText = 'Case number is required';
      }
    }
    return result;
  }
  close(doc: DlmtCaseSummaryDTO){
    this.resetForm();
    this.closeDialogClick.emit({action: 'closeNewDialog', data: {reload: this.reloadFlag, doc: doc}});
  }
}
