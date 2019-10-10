import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ZoneAreaDTO, ZoneAreaClient, ZoneAreaUpdateRequest } from 'src/app/services/apis/dlmt-api';

@Component({
  selector: 'app-zone-area-details',
  templateUrl: './zone-area-details.component.html',
  styleUrls: ['./zone-area-details.component.css']
})
export class ZoneAreaDetailsComponent implements OnInit, OnDestroy {
  
 
  @Input() doc:ZoneAreaDTO;
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
  constructor(private formBuilder: FormBuilder, private zoneAreaClient: ZoneAreaClient) { }

  ngOnInit() {
    this.initFormData();

  }
  ngOnDestroy(): void {
    if (this.updateSub && this.updateSub.hasOwnProperty('unsubscribe')){
      this.updateSub.unsubscribe();
    }
  }
  initFormData(){
    this.title = "New Zone Area";
    this.alertText = this.alertTextOrg;
    this.editDataFormGroup = this.formBuilder.group({
      'zone': new FormControl('', [Validators.required, Validators.maxLength(1)]),
      'name': new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    if (this.doc && this.doc.id > 0){
      this.title = "Edit";
      this.editDataFormGroup.patchValue(
        {
          'zone': this.doc.zone,
          'name': this.doc.name
        }
      );
    }
    else{
      this.doc = new ZoneAreaDTO();
      this.doc.id = 0;
    }
    this.isReady = true;
  }
  resetForm(){
    this.doc = new ZoneAreaDTO();
    this.isReady = false;
  }
  onSubmit(){
    this.hasError = false;
    this.alertText = this.alertTextOrg;
    if (this.validateForm()){
      this.isLoading = true;
        let insertReq = new ZoneAreaUpdateRequest();
        insertReq.zoneArea = this.generateRequest() as ZoneAreaDTO;
        this.updateSub = this.zoneAreaClient.update(insertReq).subscribe(
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
          ()=>{
            this.isLoading = false;
            this.hasError = true;
            this.alertText = "Unexpected exception: contact admin for details";
          }
        );
    }
  }
  generateRequest(): ZoneAreaDTO{
    let tempDoc = this.doc;
    let tempZoneVal = this.editDataFormGroup.controls['zone'].value || '';
    let tempNameVal = this.editDataFormGroup.controls['name'].value || '';
    tempDoc.zone =  tempZoneVal.trim();
    tempDoc.name = tempNameVal.trim();
    return tempDoc;
  }
  validateForm():boolean{
    let result = true;
    this.hasError = false;
    result = this.editDataFormGroup.valid;
    if (!result){
      this.hasError = true;
      let tempZoneVal = this.editDataFormGroup.controls['zone'].value || '';
      let tempNameVal = this.editDataFormGroup.controls['name'].value || '';
      if (tempZoneVal.trim().length <= 0){
        this.alertText = 'Zone is required';
      }
      else if (tempZoneVal.trim().length > 1){
        this.alertText = 'Zone is limitted to 1 character or less.';
      }
      else if (tempNameVal.trim().length <= 0){
        this.alertText = 'Name is required.';
      }
      else if (tempNameVal.trim().length > 100){
        this.alertText = 'Name is limitted to 100 character or less.';
      }
    }
    return result;
  }
  close(){
    this.resetForm();
    this.closeDialogClick.emit({action: 'closeDialog', data: {reload: this.reloadFlag}})
  }

}
