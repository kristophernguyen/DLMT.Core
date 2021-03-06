import { Injectable } from "@angular/core";
import { ZoneAreaClient, ZoneAreaGetAllRequest } from '../apis/dlmt-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PredicateMapper } from './grid-helper-util';

@Injectable()
export class ZoneAreaApiHelperService extends BehaviorSubject<GridDataResult>{
    public loading: boolean;
    constructor(private zoneAreaClient: ZoneAreaClient){
        super(null);
    }
    getAllZoneArea(state:State){
        this.loading = true;
        let req = new ZoneAreaGetAllRequest();
        if (state){
            req.predicate = PredicateMapper.MapTo(state);
        }
        this.zoneAreaClient.all(req)
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