import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { AppSettingService } from './services/common/app-setting-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
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
