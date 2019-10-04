import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSettingApi } from 'src/app/services/apis/app-setting-api';
import { IColumn } from 'src/app/model/kendo-column';
import { IKendoView } from 'src/app/model/kendo-view-att';

@Component({
  selector: 'app-case-type-view',
  templateUrl: './case-type-view.component.html',
  styleUrls: ['./case-type-view.component.css']
})
export class CaseTypeViewComponent implements OnInit, OnDestroy {
  
  isReady:boolean;
  viewSettingSub:any;
  public gridData: any[] = [];
  columns: IColumn[] = [];
  view:IKendoView;
  constructor(private appSettingApi: AppSettingApi) { }
  ngOnDestroy(): void {
    if (this.viewSettingSub){
      this.viewSettingSub.unsubscribe();
    }
  }
  ngOnInit() {
    this.initView();
  }
  initView(){
    this.columns = [];
    this.viewSettingSub = this.appSettingApi.viewSetting(1).subscribe(
      x=>{
        if (x && x.result){
          for(let i = 0; i < x.result.columns.length; i++){
            let tempServerColumn = x.result.columns[i];
            let tempColumn = {} as IColumn
            tempColumn.field = tempServerColumn.propertyValueName;
            tempColumn.title = tempServerColumn.columnName;
            tempColumn.width = tempServerColumn.columnWidth;
            tempColumn.type = tempServerColumn.columnType;
            tempColumn.format = tempServerColumn.columnFormat || '';
            this.columns.push(tempColumn);
          }
          if (x.result.viewAttributes){
            this.view = {} as IKendoView;
            for(let i = 0; i < x.result.viewAttributes.length; i++){
              let tempItem = x.result.viewAttributes[i];
              this.view[tempItem.attributeKey] = tempItem.attributeKey
            }
          }
        }
        this.isReady = true;
      },
      err =>{

      }
    );
  }

}
