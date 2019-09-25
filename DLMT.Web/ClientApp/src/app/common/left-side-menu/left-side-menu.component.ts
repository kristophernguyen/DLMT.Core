import { Component, OnInit } from '@angular/core';
import { MenuDTO, MenuItemDTO } from 'src/app/model/menu-dto';

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.css']
})
export class LeftSideMenuComponent implements OnInit {
  //Todo: add input
  menu: MenuDTO;
  menuItems: MenuItemDTO[] = [];
  constructor() { }

  ngOnInit() {
  }
  parentMenuClick($event, m: MenuItemDTO){
    for(let i = 0; i < this.menuItems.length; i++){
      this.menuItems[i].showChildDsp = this.menuItems[i].itemId === m.itemId;
    }
  }
  subMenuClick($event, c: MenuItemDTO){
    for(let i = 0; i < this.menuItems.length; i++){
      this.menuItems[i].isActiveDsp = this.menuItems[i].itemId === c.parentItemId;
    }
  }
}
