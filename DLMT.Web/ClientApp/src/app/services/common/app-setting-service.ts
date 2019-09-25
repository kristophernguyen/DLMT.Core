import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppSettingService{
    private menuCollapse = false;
    constructor(){}
    setMenuState(flag: boolean){
        this.menuCollapse = flag;
    }
    getMenuState():boolean{
        return this.menuCollapse;
    }

}