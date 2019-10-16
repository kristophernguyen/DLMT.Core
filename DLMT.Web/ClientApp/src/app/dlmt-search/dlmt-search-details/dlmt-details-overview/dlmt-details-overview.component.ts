import { Component, OnInit } from '@angular/core';
import { DlmtCaseDetailsService } from 'src/app/services/case-details/case-details-service-helper';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { AgencyDTO, ZoneAreaDTO, PlanningOfficeDTO } from 'src/app/services/apis/dlmt-api';

@Component({
  selector: 'app-dlmt-details-overview',
  templateUrl: './dlmt-details-overview.component.html',
  styleUrls: ['./dlmt-details-overview.component.css']
})
export class DlmtDetailsOverviewComponent implements OnInit {
  editLocationInfoFormGroup: FormGroup;
  constructor(private dlmtCaseDetailsService: DlmtCaseDetailsService, private formBuilder: FormBuilder) { }

  hasError = false;
  alertText = "";
  toolbarPosition = "top";
  pageSize = 10;
  skip = 0;
  gridView: GridDataResult;
  data: Object[];
  agencyList: AgencyDTO[] = [];
  areaList:ZoneAreaDTO[] = [];
  planningOfficeList:PlanningOfficeDTO[] = [];
  disableLocationUpdate = true;
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.alertText = "Click add/remove button below to add/remove phases.";
    this.editLocationInfoFormGroup = this.formBuilder.group({
      'agency': new FormControl('', [Validators.required]),
      'area': new FormControl('', [Validators.required]),
      'planningOffice': new FormControl('', [Validators.required])
    });
    this.loadLookup();
    this.loadItems();

  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  private loadLookup(){
    let lookupResult = this.dlmtCaseDetailsService.getCaseDetailsFormLookup();
    let formDetails = this.dlmtCaseDetailsService.getCaseDetails();

    this.agencyList = lookupResult.agencies;
    this.areaList = lookupResult.zoneAreas;
    this.planningOfficeList = lookupResult.planningOffices;
    let tempSelectedAgencyId = formDetails.mainCase.agencyId || 0;

    if (formDetails && formDetails.mainCase){
      for(let i = 0; i < this.agencyList.length; i++){
        if (this.agencyList[i].id === tempSelectedAgencyId){
          this.editLocationInfoFormGroup.get('agency').patchValue(tempSelectedAgencyId);
          break;
        }
      }
      let tempSelectedZoneId = formDetails.mainCase.zoneId || 0;
      if (tempSelectedZoneId > 0){
        for(let i = 0; i < this.areaList.length; i++){
          if (this.areaList[i].id === tempSelectedZoneId){
            this.editLocationInfoFormGroup.get('area').patchValue(tempSelectedZoneId);
            break;
          }
        }
      }
      let tempSelectedPlanningOfficeId = formDetails.mainCase.planningOfficeId || 0;
      if (tempSelectedPlanningOfficeId > 0){
        for(let i = 0; i < this.planningOfficeList.length; i++){
          if (this.planningOfficeList[i].id === tempSelectedPlanningOfficeId){
            this.editLocationInfoFormGroup.get('planningOffice').patchValue(tempSelectedPlanningOfficeId);
            break;
          }
        }
      }
      }
      
  }
  private loadItems(): void {
    let detailsResult = this.dlmtCaseDetailsService.getCaseDetails();
    this.data = detailsResult.casePhases;
    if (this.data && this.data.length) {
      this.gridView = {
        data: this.data.slice(this.skip, this.skip + this.pageSize),
        total: this.data.length
      }
    }
  }
  updateLocation($event){
    $event.preventDefault();
    this.disableLocationUpdate = false;
  }
  saveLocation($event){
    $event.preventDefault();
    this.disableLocationUpdate = true;

  }

}
