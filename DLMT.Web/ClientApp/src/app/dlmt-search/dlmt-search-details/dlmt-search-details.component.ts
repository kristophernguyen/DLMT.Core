import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DlmtCaseClient, CasePhaseDTO } from 'src/app/services/apis/dlmt-api';
import { DlmtCaseDetailsService } from 'src/app/services/case-details/case-details-service-helper';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { MenuDTO, MenuItemDTO } from 'src/app/model/menu-dto';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dlmt-search-details',
  templateUrl: './dlmt-search-details.component.html',
  styleUrls: ['./dlmt-search-details.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('700ms ease-in-out')),
      transition('out => in', animate('700ms ease-in-out'))
    ])
  ]
})
export class DlmtSearchDetailsComponent implements OnInit, OnDestroy {

  @Input() docId:number;
  @Output() closeDialogClick = new EventEmitter();

  isReady = false;
  docMenuIsReady = false;
  docDetailsData:any;
  stepId = 0;
  reloadFlag = false;
  detailsFormLookupSub:any;
  formLookupResult:any;
  detailFormDataResult:any;
  docMenu: MenuDTO;
  casePhases: CasePhaseDTO[];
  selectedPhase: number;
  constructor(private dlmtCaseClient: DlmtCaseClient, private dlmtCaseDetailsService: DlmtCaseDetailsService ) { }

  ngOnInit() {
    this.initForm();
   
  }
  ngOnDestroy(): void {
    if (this.detailsFormLookupSub && this.detailsFormLookupSub.hasOwnProperty('unsubscribe')){
      this.detailsFormLookupSub.unsubscribe();
    }
  }
  initForm(){
    this.isReady = false;
    this.detailsFormLookupSub = this.dlmtCaseClient.detailsformlookup();
    this.detailFormDataResult = this.dlmtCaseClient.detailsformdata(this.docId);
    forkJoin([this.detailsFormLookupSub, this.detailFormDataResult])
    .subscribe(
      results => {
        this.dlmtCaseDetailsService.setCaseDetailsFormLookup(results[0]);
        this.dlmtCaseDetailsService.setCaseDetails(results[1]);
        if (results[1] && !results[1].hasError){
          this.docDetailsData = results[1];
          if (this.docDetailsData.casePhases && this.docDetailsData.casePhases.length > 0){
            this.casePhases = this.docDetailsData.casePhases;
            this.selectedPhase = this.casePhases[0].id;
            //this.dlmtCaseDetailsService.setCurrentSelectedPhase(this.casePhases[0]);
          }
        }
        this.stepId = 1;
        this.isReady = true;
        this.initDocMenu();
      },
      err=>{
        //Todo: display error msg.
      }
    );
  }
  initDocMenu(){
    this.docMenu = new MenuDTO();
    this.docMenu.menuItem = [];
    let mainItem = new MenuItemDTO();
    mainItem.menuId = 1;
    mainItem.name = "General Info";
    mainItem.isActiveDsp = true;
    mainItem.icon = "icon ion-ios-information";
    mainItem.showChildDsp = true;
    mainItem.childMenuItems = [];
    //-----------------------
    let child_Developer = new MenuItemDTO();
    child_Developer.name = "Developers";
    child_Developer.icon = "";
    child_Developer.menuId = 2;

    mainItem.childMenuItems.push(child_Developer);
    this.docMenu.menuItem.push(mainItem);

    let child_Document = new MenuItemDTO();
    child_Document.name = "Documents";
    child_Document.icon = "";
    child_Document.menuId = 3;
    this.docMenu.menuItem.push(child_Document);

    let child_Fee = new MenuItemDTO();
    child_Fee.name = "Fees";
    child_Fee.icon = "";
    child_Fee.menuId = 4;
    this.docMenu.menuItem.push(child_Fee);
    //------------------------
    let reviewInfoItem = new MenuItemDTO();
    reviewInfoItem.name = "Review Info";
    reviewInfoItem.icon = "icon ion-ios-people";
    reviewInfoItem.childMenuItems = [];
    reviewInfoItem.isActiveDsp = false;
    reviewInfoItem.menuId = 5;
    this.docMenu.menuItem.push(reviewInfoItem);
    //------------------------
    let plottingInfo = new MenuItemDTO();
    plottingInfo.name = "Plotting Info";
    plottingInfo.icon = "icon ion-compass";
    plottingInfo.isActiveDsp = false;
    plottingInfo.showChildDsp = false;
    plottingInfo.menuId = 6;
    this.docMenu.menuItem.push(plottingInfo);
    this.docMenuIsReady = true;
  }
  onPhaseChange($event){
    if ($event){

    }
  }
  initFormData(){
    if (this.docId > 0){

    }
    //get form details
  }
  mainTabSelect(tabId){
    this.stepId = tabId;
  }
  parentMenuClick($event, m){
    $event.preventDefault();
    this.stepId = m.menuId;
  }
  childMenuClick($event, m){
    $event.preventDefault();
    this.stepId = m.menuId;
  }
  closeWindow($event){
    this.closeDialogClick.emit({action: 'closeEditDialog', data: {reload: this.reloadFlag}})
  }

}
