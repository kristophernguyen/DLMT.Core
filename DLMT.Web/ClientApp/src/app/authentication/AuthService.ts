import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    currentReturnUrl: string;
    public setReturnUrl(url:string){
        this.currentReturnUrl = url;
    }
    public getReturnUrl():string{
        return this.currentReturnUrl;
    }
}