import { Injectable } from "@angular/core";
import { CaseTypeClient, CaseTypeGetAllRequest, ViewPredicate, SortModel, SortCondition, FilterModel, FilterQuery, FilterCondition } from '../apis/dlmt-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PredicateMapper } from './grid-helper-util';

@Injectable()
export class CaseTypeApiHelperService extends BehaviorSubject<GridDataResult>{
    public loading: boolean;
    constructor(private caseTypeClient: CaseTypeClient){
        super(null);
    }
    getAllCaseType(state:State){
        this.loading = true;
        let req = new CaseTypeGetAllRequest();
        if (state){
            req.predicate = PredicateMapper.MapTo(state);
        }
        this.caseTypeClient.all(req)
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