import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AppSettingApi, ViewSettingVM } from 'src/app/services/apis/app-setting-api';
import { IColumn } from 'src/app/model/kendo-column';
import { IKendoView } from 'src/app/model/kendo-view-att';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/internal/Observable';
import { DlmtApiHelperService } from 'src/app/services/grid-helper/dlmt-service-helper';

@Component({
  selector: 'app-case-type-view',
  templateUrl: './case-type-view.component.html',
  styleUrls: ['./case-type-view.component.css']
})
export class CaseTypeViewComponent implements OnInit, OnDestroy {
  @Output() actionClick = new EventEmitter();

  isReady: boolean;
  viewData: Observable<GridDataResult>;
  viewSettingSub: any;
  columns: IColumn[] = [];
  viewSetting: ViewSettingVM;
  toolbarPosition = "top";
  exportSettings: any[] = [];
  pageSizes: any[] = [];

  constructor(private appSettingApi: AppSettingApi, private dlmtService: DlmtApiHelperService) { }
  ngOnDestroy(): void {
    if (this.viewSettingSub) {
      this.viewSettingSub.unsubscribe();
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
    this.viewSettingSub = this.appSettingApi.viewSetting(1).subscribe(
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
            this.columns.push(tempColumn);
          }
          if (x.viewSetting) {
            this.viewSetting = x.viewSetting;
          }
        }
        this.viewData = this.dlmtService;
        this.isReady = true;
        let initialState = { skip: 0, take: this.viewSetting.pageSize} as State;
        this.dlmtService.getAllCaseType(initialState);
      },
      err => {

      }
    );
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.viewSetting.skip = state.skip;
    this.dlmtService.getAllCaseType(state);
  }
  
  newCaseTypeClick(){
    this.actionClick.emit({action: 'edit', data: {id: 0}});
  }

}
