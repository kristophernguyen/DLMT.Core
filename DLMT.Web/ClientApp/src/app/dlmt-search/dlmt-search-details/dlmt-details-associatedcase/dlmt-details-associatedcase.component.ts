import { Component, OnInit, OnDestroy } from '@angular/core';
import { DlmtCaseDetailsService } from 'src/app/services/case-details/case-details-service-helper';
import { DlmtCaseClient, ContactClient, CasePhaseDTO, DeveloperDTO, ContactGetAllRequest } from 'src/app/services/apis/dlmt-api';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { PredicateMapper } from 'src/app/services/grid-helper/grid-helper-util';

@Component({
  selector: 'app-dlmt-details-associatedcase',
  templateUrl: './dlmt-details-associatedcase.component.html',
  styleUrls: ['./dlmt-details-associatedcase.component.css']
})



export class DlmtDetailsAssociatedcaseComponent implements OnInit, OnDestroy {


  constructor(private dlmtCaseDetailsService: DlmtCaseDetailsService, private dlmtCaseClient: DlmtCaseClient, private contactClient: ContactClient) { }
  hasError = false;
  isLoading = false;
  alertText = "";
  tabId = 1;
  isReady = false;
  formDataSub:any;
  formDetailData:any;
  selectedPhase:CasePhaseDTO;
  phaseNo:string;
  caseNumber:string;
  developerList:DeveloperDTO[] = [];
  developerSearchList: DeveloperDTO[] = [];
  isDeveloperSearchLoading = false;
  searchDeveloperDefaultItem:DeveloperDTO;
  ngOnInit() {
    this.initForm();
    this.initFormData();
  }
  ngOnDestroy(): void {
    if (this.formDataSub && this.formDataSub.hasOwnProperty('unsubscribe')){
      this.formDataSub.unsubscribe();
    }
  }
  initForm(){
    this.searchDeveloperDefaultItem = {displayName: 'Search Developer ...', id: 0} as DeveloperDTO;
    this.alertText = "Click add/remove button below to add/remove phases.  Change selected phase using the drop down below.";
  }
  initFormData(){
    this.formDetailData = this.dlmtCaseDetailsService.getCaseDetails();
    this.selectedPhase = this.dlmtCaseDetailsService.getCurrentSelectedPhase();
    if (this.formDetailData && this.formDetailData.mainCase){
      this.caseNumber = this.formDetailData.mainCase.caseNumber;
      this.phaseNo = this.selectedPhase.phaseNo;
    }
    this.reloadDataSource();
  }

  reloadDataSource(){
    this.isLoading = true;
    this.formDataSub = this.dlmtCaseClient.personnel(this.caseNumber, this.phaseNo)
    .subscribe(
      x=>{
        this.isLoading = false;
        this.hasError = x.hasError;
        if (x.hasError){
          this.alertText = x.errorMsgs[0].errorMsg;
        }
        else{
          this.developerList = x.developers;
          this.isReady = true;
        }
        
      },
      err=>{
        this.hasError = true;
        this.alertText = "Unexpected exception.  Please contact admin for details";
        this.isLoading = false;
      }
    )
  }
  handleDeveloperFilter(value){
    this.isDeveloperSearchLoading = true;
    var state = {} as DataStateChangeEvent;
    state.skip = 0;
    state.take = 30;
    state.sort = [];
    let sortDesc = {} as SortDescriptor;
    sortDesc.dir = "desc";
    sortDesc.field = "name";
    state.sort.push(sortDesc);
    let filterDesc = {} as FilterDescriptor;
    filterDesc.field = "name";
    filterDesc.value = value;
    filterDesc.operator = "contains";
    state.filter = {} as CompositeFilterDescriptor;
    state.filter.filters = [];
    state.filter.filters.push(filterDesc);
    let predicate = PredicateMapper.MapTo(state);
    let req = new ContactGetAllRequest();
    req.predicate = predicate;
    req.contactType = "Developer";
    this.contactClient.all(req)
    .subscribe(
      x=>{
        this.isDeveloperSearchLoading = false;
        if (!x.hasError){
          this.developerSearchList = x.result;
        }
        else{
          //show error
        }
      },
      err =>{
        this.isDeveloperSearchLoading = false;
      }
    )
  }
  newDeveloper($event){
    $event.preventDefault();
  }
}
