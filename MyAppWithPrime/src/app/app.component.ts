
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, afterNextRender } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfigService } from '@service/appconfigservice';
import { HttpClientModule } from '@angular/common/http';
import { AppMainComponent } from './app.main.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AppConfigComponent } from '@layout/config/app.config.component';
import { AppTopBarComponent } from '@layout/topbar/app.topbar.component';
import { AppMenuComponent } from '@layout/menu/app.menu.component';
import { DOCUMENT, IMAGE_CONFIG } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, AppMainComponent, LandingComponent, AppConfigComponent, AppTopBarComponent, AppMenuComponent],
  providers: [
      AppConfigService,
      {
          provide: IMAGE_CONFIG,
          useValue: {
              disableImageSizeWarning: true,
              disableImageLazyLoadWarning: true
          }
      }
  ]
})
export class AppComponent implements OnInit {
  
    constructor(
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2,
      private primeng: PrimeNGConfig,
      private configService: AppConfigService,
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: any
    ) {
      afterNextRender(() => {
          this.bindRouteEvents();
      });
    }
    ngOnInit(): void {
      this.primeng.ripple = true;
    }

    bindRouteEvents() {
    
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              const { theme, darkMode } = this.configService.config();
              const landingTheme = darkMode ? 'aura-dark-blue' : 'aura-light-blue';
          console.log(darkMode);
              if (event.urlAfterRedirects === '/' && theme !== landingTheme) {
             
                  this.configService.config.update((config) => ({ ...config, theme: landingTheme, dark: darkMode }));
              }
          }
      });
    }

}
