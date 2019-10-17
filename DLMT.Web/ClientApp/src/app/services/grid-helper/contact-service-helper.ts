import { Injectable } from "@angular/core";
import { ContactClient, ContactGetAllRequest } from '../apis/dlmt-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PredicateMapper } from './grid-helper-util';

@Injectable()
export class ContactApiHelperService extends BehaviorSubject<GridDataResult>{
    public loading: boolean;
    constructor(private contactClient: ContactClient){
        super(null);
    }
    getAllContacts(state:State, contactType:string){
        this.loading = true;
        let req = new ContactGetAllRequest();
        req.contactType = contactType;
        if (state){
            req.predicate = PredicateMapper.MapTo(state);
        }
        this.contactClient.all(req)
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