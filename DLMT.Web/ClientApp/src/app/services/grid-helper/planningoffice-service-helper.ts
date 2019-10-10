import { Injectable } from "@angular/core";
import { PlanningOfficeClient, PlanningOfficeGetAllRequest } from '../apis/dlmt-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PredicateMapper } from './grid-helper-util';

@Injectable()
export class PlanningOfficeApiHelperService extends BehaviorSubject<GridDataResult>{
    public loading: boolean;
    constructor(private planningOfficeClient: PlanningOfficeClient){
        super(null);
    }
    getAllPlanningOffice(state:State){
        this.loading = true;
        let req = new PlanningOfficeGetAllRequest();
        if (state){
            req.predicate = PredicateMapper.MapTo(state);
        }
        this.planningOfficeClient.all(req)
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