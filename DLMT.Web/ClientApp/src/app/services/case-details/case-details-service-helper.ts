import { Injectable } from '@angular/core';
import { DlmtCaseClient, DetailsFormLookupResponse, DlmtDetailsFormDataResponse, CasePhaseDTO } from '../apis/dlmt-api';

@Injectable()
export class DlmtCaseDetailsService{
    private mainDoc:DlmtDetailsFormDataResponse;
    private docLookup:DetailsFormLookupResponse
    currentSelectedPhase: CasePhaseDTO;
    constructor(private dlmtCaseClient: DlmtCaseClient){}
    setCaseDetails(doc:DlmtDetailsFormDataResponse){
        this.mainDoc = doc;
    }
    getCaseDetails() : DlmtDetailsFormDataResponse{
        return this.mainDoc;
    }
    setCaseDetailsFormLookup(docLookup:DetailsFormLookupResponse){
        this.docLookup = docLookup;
    }
    getCaseDetailsFormLookup() : DetailsFormLookupResponse{
        return this.docLookup;
    }
    setCurrentSelectedPhase(phase: CasePhaseDTO){
        this.currentSelectedPhase = phase;
    }
    getCurrentSelectedPhase() : CasePhaseDTO{
        return this.currentSelectedPhase;
    }
    
}