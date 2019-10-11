import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppMenuClient, MenuDTO, MenuItemDTO } from 'src/app/services/apis/app-setting-api';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('700ms ease-in-out')),
      transition('out => in', animate('700ms ease-in-out'))
    ])
  ]
})
export class LeftSideMenuComponent implements OnInit, OnDestroy {

  //Todo: add input
  menu:MenuDTO;
  menuItems: MenuItemDTO[] = [];
  reloadMenuFlag: boolean;
  appSettingApiSub:any;
  
  constructor(private appMenuClient: AppMenuClient, private router: Router) { }

  ngOnInit() {
    this.loadMenu();
  }
  ngOnDestroy(): void {
    if (this.appSettingApiSub){
      this.appSettingApiSub.unsubscribe();
    }
  }
  public loadMenu(){
    this.appSettingApiSub = this.appMenuClient.appMenu(1).subscribe(
      x=>{
        this.menu = x.menu;
        this.menuItems = x.menu.menuItem;
        this.reloadMenuFlag = true;
      },
      err=>{
        //do something about this
      }
    );
  }

  
  parentMenuClick($event, m: MenuItemDTO){
    for(let i = 0; i < this.menuItems.length; i++){
      this.menuItems[i].showChildDsp = this.menuItems[i].itemId === m.itemId;
      this.menuItems[i].isActiveDsp = this.menuItems[i].itemId === m.itemId;
    }
    if (!m.hasChild && m.routeName && m.routeName.length > 0 ){
      this.router.navigateByUrl(m.routeName);
    }
    
  }
  childMenuClick($event, c: MenuItemDTO){
    for(let i = 0; i < this.menuItems.length; i++){
      this.menuItems[i].isActiveDsp = this.menuItems[i].itemId === c.parentItemId;
    }
  }
}



