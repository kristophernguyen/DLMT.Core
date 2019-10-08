import { Injectable } from "@angular/core";
import { DlmtApi, CaseTypeGetAllRequest, ViewPredicate } from '../apis/dlmt-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Injectable()
export class DlmtApiHelperService extends BehaviorSubject<GridDataResult>{
    public loading: boolean;
    constructor(private dlmtApi: DlmtApi){
        super(null);
    }
    getAllCaseType(state:State){
        this.loading = true;
        let req = new CaseTypeGetAllRequest();
        if (state){
            req.predicate = this.mapPredicate(state);
        }
        this.dlmtApi.caseType(req)
        .subscribe(x =>{
            this.loading = false;
            let result = (<GridDataResult>{
                data: x.result,
                total: x.total
            });
            return super.next(result);
        });
    }
    private mapPredicate(state:State) : ViewPredicate{
        let predicate = new ViewPredicate();
        if (state){
            let tempStart = state.skip;
            predicate.startRow = tempStart;
            predicate.endRow = state.skip + state.take;
        }
        return predicate;
    }

}