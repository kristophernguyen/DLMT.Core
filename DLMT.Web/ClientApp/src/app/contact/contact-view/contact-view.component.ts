



import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { ViewSettingClient, ViewSettingVM } from 'src/app/services/apis/app-setting-api';
import { IColumn } from 'src/app/model/kendo-column';
import { DataStateChangeEvent, GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, SortDescriptor, FilterDescriptor} from '@progress/kendo-data-query';
import { Observable } from 'rxjs/internal/Observable';
import { AgencyClient, AgencyDTO, ContactClient } from 'src/app/services/apis/dlmt-api';
import { ViewConstants } from 'src/app/common/constants/viewconst';
import { AgencyApiHelperService } from 'src/app/services/grid-helper/agency-service-helper';
import { ContactApiHelperService } from 'src/app/services/grid-helper/contact-service-helper';


@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit, OnDestroy {
  @Output() actionClick = new EventEmitter();
  @Input() contactType:string;
  @ViewChild('grid', {static: false}) grid: GridComponent;
  isReady: boolean;
  confirmDialog = false;
  currentRemoveDoc: AgencyDTO;
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
    private contactClient: ContactClient,
    private contactService: ContactApiHelperService) { }
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
    this.viewSettingSub = this.viewSettingClient.viewSetting(ViewConstants.Contact).subscribe(
      x => {
        if (x && x.result) {

          for (let i = 0; i < x.result.columns.length; i++) {
            let tempServerColumn = x.result.columns[i];
            let tempColumn = {} as IColumn
            tempColumn.field = tempServerColumn.propertyValueName;
            tempColumn.title = tempServerColumn.columnName;
            if (tempServerColumn.columnWidth){
              tempColumn.width = tempServerColumn.columnWidth;
            }
            tempColumn.type = tempServerColumn.columnType;
            tempColumn.format = tempServerColumn.columnFormat || '';
            tempColumn.isFilterable = tempServerColumn.isFilterable;
            this.columns.push(tempColumn);
          }
          if (x.viewSetting) {
            this.viewSetting = x.viewSetting;
          }
        }
        this.viewData = this.contactService;
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
        this.contactService.getAllContacts(this.state, this.contactType);
      },
      () => {

      }
    );
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.viewSetting.skip = state.skip;
    this.contactService.getAllContacts(state, this.contactType);
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
    this.contactService.getAllContacts(this.state, this.contactType);
  }
  public editHandler({rowIndex, dataItem}) {
    if (rowIndex >= 0){
      this.actionClick.emit({action: 'edit', data: {doc: dataItem}});
    }
  }
  public deleteHandler({ dataItem }) {
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
    this.contactService.getAllContacts(this.state, this.contactType);
  }
  closeConfirmDialog(){
    this.confirmDialog = false;
  }
  confirmDelete() {
    this.deleteSub = this.contactClient.delete(this.currentRemoveDoc.id).subscribe(
      x=>{
        if (!x.hasError){
          this.reloadView();
        }
        this.closeConfirmDialog();
      }
    );
  }
  newDocClick(){
    this.actionClick.emit({action: 'edit', data: {id: 0}});
  }

}
