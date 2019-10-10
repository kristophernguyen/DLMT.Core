import { Injectable } from '@angular/core';
import { AgencyClient, AgencyGetAllRequest } from '../apis/dlmt-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PredicateMapper } from './grid-helper-util';

@Injectable()
export class AgencyApiHelperService extends BehaviorSubject<GridDataResult>{
    public loading: boolean;
    constructor(private agencyClient: AgencyClient){
        super(null);
    }
    getAllAgency(state:State){
        this.loading = true;
        let req = new AgencyGetAllRequest();
        if (state){
            req.predicate = PredicateMapper.MapTo(state);
        }
        this.agencyClient.all(req)
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