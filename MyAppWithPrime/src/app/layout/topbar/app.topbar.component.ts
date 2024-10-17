import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, Renderer2, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigService } from '@service/appconfigservice';

@Component({
    selector: 'app-topbar',
    standalone: true,
    templateUrl: './app.topbar.component.html',
    imports: [CommonModule, FormsModule, StyleClassModule, RouterModule]
})
export class AppTopBarComponent implements OnDestroy {
    @Input() showConfigurator = true;

    @Input() showMenuButton = true;

    @Output() onDarkModeSwitch = new EventEmitter<any>();

    scrollListener: VoidFunction | null;

    private window: Window;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private el: ElementRef,
        private renderer: Renderer2,
        private router: Router,
        private configService: AppConfigService
    ) {
        this.window = this.document.defaultView as Window;

        afterNextRender(() => {
            this.bindScrollListener();
        });
    }

    get isDarkMode() {
        return this.configService.config().darkMode;
    }

    showConfig() {
        this.configService.showConfig();
    }

    toggleDarkMode() {
        this.onDarkModeSwitch.emit(null);
    }

    bindScrollListener() {
        if (!this.scrollListener) {
            this.scrollListener = this.renderer.listen(this.window, 'scroll', () => {
                if (this.window.scrollY > 0) {
                    this.el.nativeElement.children[0].classList.add('layout-topbar-sticky');
                } else {
                    this.el.nativeElement.children[0].classList.remove('layout-topbar-sticky');
                }
            });
        }
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindScrollListener();
    }
}
