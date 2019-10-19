import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportClient } from 'src/app/services/apis/dlmt-api';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit, OnDestroy {
 
  isReady: boolean;
  hasData: boolean;
  alertText: string;
  dataSource:any[] = [];
  dataSourceSub:any;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Name';
  showYAxisLabel = true;
  yAxisLabel = 'Rate';

  constructor(private reportClient: ReportClient) { }

  ngOnInit() {
    
    this.reloadDataSource();
  }
  ngOnDestroy(): void {
    if (this.dataSourceSub && this.dataSourceSub.hasOwnProperty('unsubscribe')){
      this.dataSourceSub.unsubscribe();
    }
  }
  reloadDataSource(){
    this.hasData = false;
    this.dataSourceSub = this.reportClient.adpmain()
    .subscribe(
      x=>{
        this.isReady = true;
        this.dataSource = [];
        if (x && !x.hasError){
          this.hasData = x.data.length > 0;
          for(let i = 0; i < x.data.length; i++){
            let tempItem = {name: x.data[i].adpName, value: x.data[i].rate};
            this.dataSource.push(tempItem)
          }
        }
      }
    );
  }

}
