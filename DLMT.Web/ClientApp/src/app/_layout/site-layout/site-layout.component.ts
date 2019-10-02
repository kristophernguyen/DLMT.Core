import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppSettingService } from 'src/app/services/common/app-setting-service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})

export class SiteLayoutComponent implements OnInit, OnDestroy {
  title = 'DLMT';
  isMenuOpen = true;
  constructor(
    private appSettingService: AppSettingService,
    private renderer: Renderer2
  ) {}
  ngOnInit() {}

  ngOnDestroy(): void { }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.appSettingService.setMenuState(this.isMenuOpen);
    if (window.matchMedia('(min-width:600px)').matches) {
      if (this.isMenuOpen) {
        this.renderer.addClass(document.body, 'show-sidebar');
        this.renderer.removeClass(document.body, 'hide-sidebar');
      }
      else {
        this.renderer.addClass(document.body, 'hide-sidebar');
        this.renderer.removeClass(document.body, 'show-sidebar');
      }
    }
  }
}
