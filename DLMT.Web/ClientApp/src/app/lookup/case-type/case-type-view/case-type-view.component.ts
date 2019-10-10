import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { ViewSettingClient, ViewSettingVM } from 'src/app/services/apis/app-setting-api';
import { IColumn } from 'src/app/model/kendo-column';
import { DataStateChangeEvent, GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, SortDescriptor, FilterDescriptor} from '@progress/kendo-data-query';
import { Observable } from 'rxjs/internal/Observable';
import { CaseTypeApiHelperService } from 'src/app/services/grid-helper/casetype-service-helper';
import { CaseTypeClient, CaseTypeDTO } from 'src/app/services/apis/dlmt-api';
import { ViewConstants } from 'src/app/common/constants/viewconst';

@Component({
  selector: 'app-case-type-view',
  templateUrl: './case-type-view.component.html',
  styleUrls: ['./case-type-view.component.css']
})
export class CaseTypeViewComponent implements OnInit, OnDestroy {
  @Output() actionClick = new EventEmitter();
  @ViewChild('grid', {static: false}) grid: GridComponent;
  isReady: boolean;
  confirmDialog = false;
  currentRemoveDoc: CaseTypeDTO;
  viewData: Observable<GridDataResult>;
  viewSettingSub: any;
  columns: IColumn[] = [];
  viewSetting: ViewSettingVM;
  toolbarPosition = "top";
  exportSettings: any[] = [];
  pageSizes: any[] = [];
  public state: State = {};
  deleteSub:any;
  constructor(
    private viewSettingClient: ViewSettingClient,
    private caseTypeClient: CaseTypeClient,
    private caseTypeService: CaseTypeApiHelperService) { }
  ngOnDestroy(): void {
    if (this.viewSettingSub && this.viewSettingSub.hasOwnProperty('unsubscribe')) {
      this.viewSettingSub.unsubscribe();
    }
    if (this.deleteSub && this.deleteSub.hasOwnProperty('unsubscribe')) {
      this.deleteSub.unsubscribe();
    }
    
  }
  ngOnInit() {
    this.initView();
  }
  initView() {
    this.columns = [];
    this.exportSettings = [
      {
        text: 'Excel'
      }, {
        text: 'PDF'
      }
    ];
    this.viewSettingSub = this.viewSettingClient.viewSetting(ViewConstants.CaseType).subscribe(
      x => {
        if (x && x.result) {

          for (let i = 0; i < x.result.columns.length; i++) {
            let tempServerColumn = x.result.columns[i];
            let tempColumn = {} as IColumn
            tempColumn.field = tempServerColumn.propertyValueName;
            tempColumn.title = tempServerColumn.columnName;
            tempColumn.width = tempServerColumn.columnWidth;
            tempColumn.type = tempServerColumn.columnType;
            tempColumn.format = tempServerColumn.columnFormat || '';
            tempColumn.isFilterable = tempServerColumn.isFilterable;
            this.columns.push(tempColumn);
          }
          if (x.viewSetting) {
            this.viewSetting = x.viewSetting;
          }
        }
        this.viewData = this.caseTypeService;
        this.isReady = true;
        let tempInitialSort: SortDescriptor[] = [{
          field: 'id',
          dir: 'desc'
        }];
        this.state = { 
          skip: 0, 
          take: this.viewSetting.pageSize,
          sort: tempInitialSort
        } as State;
        this.caseTypeService.getAllCaseType(this.state);
      },
      err => {

      }
    );
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.viewSetting.skip = state.skip;
    this.caseTypeService.getAllCaseType(state);
  }
  public searchView($event){
    this.state.filter = {
      logic: 'or', 
      filters: []
    };
    if (this.columns && this.columns.length > 0){
      for(let i = 0; i < this.columns.length; i++){
        if (this.columns[i].isFilterable){
          let tempFilter = {field: this.columns[i].field, operator: 'contains', value: $event} as FilterDescriptor;
          this.state.filter.filters.push(tempFilter);
        }
      }
    }
    this.caseTypeService.getAllCaseType(this.state);
  }
  public editHandler({sender, rowIndex, dataItem}) {
    if (rowIndex >= 0){
      this.actionClick.emit({action: 'edit', data: {doc: dataItem}});
    }
  }
  public deleteHandler({ sender, dataItem }) {
    if (dataItem.id >= 0){
      this.currentRemoveDoc = dataItem;
      this.openConfirmDialog();
    }
  }
  exportView($event){
    if ($event){
      this.grid.saveAsExcel();
    }
  }

  openConfirmDialog(){
    this.confirmDialog = true;
    
  }
  reloadView(){
    this.caseTypeService.getAllCaseType(this.state);
  }
  closeConfirmDialog(){
    this.confirmDialog = false;
  }
  confirmDelete() {
    this.deleteSub = this.caseTypeClient.delete(this.currentRemoveDoc.id).subscribe(
      x=>{
        if (!x.hasError){
          this.reloadView();
        }
        this.closeConfirmDialog();
      }
    );
  }
  newCaseTypeClick(){
    this.actionClick.emit({action: 'edit', data: {id: 0}});
  }

}
