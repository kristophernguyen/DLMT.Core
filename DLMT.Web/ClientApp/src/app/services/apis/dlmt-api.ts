/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.1.2.0 (NJsonSchema v10.0.24.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { DlmtApiUrl } from 'src/app/common/config/app-config';

//export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class DlmtApi {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(DlmtApiUrl) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    caseType(body: CaseTypeGetAllRequest | undefined): Observable<CaseTypeGetAllResponse> {
        let url_ = this.baseUrl + "/api/CaseType";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json", 
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCaseType(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCaseType(<any>response_);
                } catch (e) {
                    return <Observable<CaseTypeGetAllResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<CaseTypeGetAllResponse>><any>_observableThrow(response_);
        }));
    }

    protected processCaseType(response: HttpResponseBase): Observable<CaseTypeGetAllResponse> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = CaseTypeGetAllResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData400) {
                result400 = {} as any;
                for (let key in resultData400) {
                    if (resultData400.hasOwnProperty(key))
                        result400![key] = resultData400[key];
                }
            }
            return throwException("Bad Request", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CaseTypeGetAllResponse>(<any>null);
    }
}

export class FilterCondition implements IFilterCondition {
    filterType?: string | undefined;
    searchKey?: string | undefined;

    constructor(data?: IFilterCondition) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.filterType = data["filterType"];
            this.searchKey = data["searchKey"];
        }
    }

    static fromJS(data: any): FilterCondition {
        data = typeof data === 'object' ? data : {};
        let result = new FilterCondition();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["filterType"] = this.filterType;
        data["searchKey"] = this.searchKey;
        return data; 
    }
}

export interface IFilterCondition {
    filterType?: string | undefined;
    searchKey?: string | undefined;
}

export class FilterQuery implements IFilterQuery {
    filterOperator?: string | undefined;
    columnName?: string | undefined;
    dataType?: string | undefined;
    conditions?: FilterCondition[] | undefined;

    constructor(data?: IFilterQuery) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.filterOperator = data["filterOperator"];
            this.columnName = data["columnName"];
            this.dataType = data["dataType"];
            if (Array.isArray(data["conditions"])) {
                this.conditions = [] as any;
                for (let item of data["conditions"])
                    this.conditions!.push(FilterCondition.fromJS(item));
            }
        }
    }

    static fromJS(data: any): FilterQuery {
        data = typeof data === 'object' ? data : {};
        let result = new FilterQuery();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["filterOperator"] = this.filterOperator;
        data["columnName"] = this.columnName;
        data["dataType"] = this.dataType;
        if (Array.isArray(this.conditions)) {
            data["conditions"] = [];
            for (let item of this.conditions)
                data["conditions"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IFilterQuery {
    filterOperator?: string | undefined;
    columnName?: string | undefined;
    dataType?: string | undefined;
    conditions?: FilterCondition[] | undefined;
}

export class FilterModel implements IFilterModel {
    filterQueries?: FilterQuery[] | undefined;

    constructor(data?: IFilterModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["filterQueries"])) {
                this.filterQueries = [] as any;
                for (let item of data["filterQueries"])
                    this.filterQueries!.push(FilterQuery.fromJS(item));
            }
        }
    }

    static fromJS(data: any): FilterModel {
        data = typeof data === 'object' ? data : {};
        let result = new FilterModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.filterQueries)) {
            data["filterQueries"] = [];
            for (let item of this.filterQueries)
                data["filterQueries"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IFilterModel {
    filterQueries?: FilterQuery[] | undefined;
}

export class SortCondition implements ISortCondition {
    columnName?: string | undefined;
    sortType?: string | undefined;

    constructor(data?: ISortCondition) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.columnName = data["columnName"];
            this.sortType = data["sortType"];
        }
    }

    static fromJS(data: any): SortCondition {
        data = typeof data === 'object' ? data : {};
        let result = new SortCondition();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["columnName"] = this.columnName;
        data["sortType"] = this.sortType;
        return data; 
    }
}

export interface ISortCondition {
    columnName?: string | undefined;
    sortType?: string | undefined;
}

export class SortModel implements ISortModel {
    sortConditions?: SortCondition[] | undefined;

    constructor(data?: ISortModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["sortConditions"])) {
                this.sortConditions = [] as any;
                for (let item of data["sortConditions"])
                    this.sortConditions!.push(SortCondition.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SortModel {
        data = typeof data === 'object' ? data : {};
        let result = new SortModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.sortConditions)) {
            data["sortConditions"] = [];
            for (let item of this.sortConditions)
                data["sortConditions"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ISortModel {
    sortConditions?: SortCondition[] | undefined;
}

export class ViewPredicate implements IViewPredicate {
    startRow?: number;
    endRow?: number;
    filter?: FilterModel;
    sort?: SortModel;

    constructor(data?: IViewPredicate) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.startRow = data["startRow"];
            this.endRow = data["endRow"];
            this.filter = data["filter"] ? FilterModel.fromJS(data["filter"]) : <any>undefined;
            this.sort = data["sort"] ? SortModel.fromJS(data["sort"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ViewPredicate {
        data = typeof data === 'object' ? data : {};
        let result = new ViewPredicate();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["startRow"] = this.startRow;
        data["endRow"] = this.endRow;
        data["filter"] = this.filter ? this.filter.toJSON() : <any>undefined;
        data["sort"] = this.sort ? this.sort.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IViewPredicate {
    startRow?: number;
    endRow?: number;
    filter?: FilterModel;
    sort?: SortModel;
}

export class CaseTypeGetAllRequest implements ICaseTypeGetAllRequest {
    currentUser?: string | undefined;
    roles?: string[] | undefined;
    predicate?: ViewPredicate;

    constructor(data?: ICaseTypeGetAllRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.currentUser = data["currentUser"];
            if (Array.isArray(data["roles"])) {
                this.roles = [] as any;
                for (let item of data["roles"])
                    this.roles!.push(item);
            }
            this.predicate = data["predicate"] ? ViewPredicate.fromJS(data["predicate"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CaseTypeGetAllRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CaseTypeGetAllRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["currentUser"] = this.currentUser;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        data["predicate"] = this.predicate ? this.predicate.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ICaseTypeGetAllRequest {
    currentUser?: string | undefined;
    roles?: string[] | undefined;
    predicate?: ViewPredicate;
}

export class CaseTypeDTO implements ICaseTypeDTO {
    id?: number;
    caseType?: string | undefined;
    description?: string | undefined;
    createdBy?: string | undefined;
    createdDate?: Date;
    updatedDate?: Date;
    updatedBy?: string | undefined;
    statusId?: number;

    constructor(data?: ICaseTypeDTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.caseType = data["caseType"];
            this.description = data["description"];
            this.createdBy = data["createdBy"];
            this.createdDate = data["createdDate"] ? new Date(data["createdDate"].toString()) : <any>undefined;
            this.updatedDate = data["updatedDate"] ? new Date(data["updatedDate"].toString()) : <any>undefined;
            this.updatedBy = data["updatedBy"];
            this.statusId = data["statusId"];
        }
    }

    static fromJS(data: any): CaseTypeDTO {
        data = typeof data === 'object' ? data : {};
        let result = new CaseTypeDTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["caseType"] = this.caseType;
        data["description"] = this.description;
        data["createdBy"] = this.createdBy;
        data["createdDate"] = this.createdDate ? this.createdDate.toISOString() : <any>undefined;
        data["updatedDate"] = this.updatedDate ? this.updatedDate.toISOString() : <any>undefined;
        data["updatedBy"] = this.updatedBy;
        data["statusId"] = this.statusId;
        return data; 
    }
}

export interface ICaseTypeDTO {
    id?: number;
    caseType?: string | undefined;
    description?: string | undefined;
    createdBy?: string | undefined;
    createdDate?: Date;
    updatedDate?: Date;
    updatedBy?: string | undefined;
    statusId?: number;
}

export class ErrorDTO implements IErrorDTO {
    errorCode?: string | undefined;
    errorType?: string | undefined;
    errorMsg?: string | undefined;

    constructor(data?: IErrorDTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.errorCode = data["errorCode"];
            this.errorType = data["errorType"];
            this.errorMsg = data["errorMsg"];
        }
    }

    static fromJS(data: any): ErrorDTO {
        data = typeof data === 'object' ? data : {};
        let result = new ErrorDTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["errorCode"] = this.errorCode;
        data["errorType"] = this.errorType;
        data["errorMsg"] = this.errorMsg;
        return data; 
    }
}

export interface IErrorDTO {
    errorCode?: string | undefined;
    errorType?: string | undefined;
    errorMsg?: string | undefined;
}

export class CaseTypeGetAllResponse implements ICaseTypeGetAllResponse {
    result?: CaseTypeDTO[] | undefined;
    total?: number;
    hasError?: boolean;
    errorMsgs?: ErrorDTO[] | undefined;

    constructor(data?: ICaseTypeGetAllResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["result"])) {
                this.result = [] as any;
                for (let item of data["result"])
                    this.result!.push(CaseTypeDTO.fromJS(item));
            }
            this.total = data["total"];
            this.hasError = data["hasError"];
            if (Array.isArray(data["errorMsgs"])) {
                this.errorMsgs = [] as any;
                for (let item of data["errorMsgs"])
                    this.errorMsgs!.push(ErrorDTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CaseTypeGetAllResponse {
        data = typeof data === 'object' ? data : {};
        let result = new CaseTypeGetAllResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.result)) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        data["total"] = this.total;
        data["hasError"] = this.hasError;
        if (Array.isArray(this.errorMsgs)) {
            data["errorMsgs"] = [];
            for (let item of this.errorMsgs)
                data["errorMsgs"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ICaseTypeGetAllResponse {
    result?: CaseTypeDTO[] | undefined;
    total?: number;
    hasError?: boolean;
    errorMsgs?: ErrorDTO[] | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = event => { 
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob); 
        }
    });
}