import { Injectable } from "@angular/core";
import { DlmtCaseClient, DlmtCaseGetAllRequest } from '../apis/dlmt-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PredicateMapper } from './grid-helper-util';

@Injectable()
export class DlmtSearchApiHelperService extends BehaviorSubject<GridDataResult>{
    public loading: boolean;
    constructor(private dlmtCaseClient: DlmtCaseClient){
        super(null);
    }
    getAllDlmtCase(state:State){
        this.loading = true;
        let req = new DlmtCaseGetAllRequest();
        if (state){
            req.predicate = PredicateMapper.MapTo(state);
        }
        this.dlmtCaseClient.all(req)
        .subscribe(x =>{
            this.loading = false;
            let result = (<GridDataResult>{
                data: x.result,
                total: x.total
            });
            return super.next(result);
        });
    }
}