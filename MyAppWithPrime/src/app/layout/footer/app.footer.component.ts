import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
        <div class="layout-footer">
            <div>
                <span>PrimeNG by </span>
                <a href="@">PrimeTek</a>
            </div>
        </div>
    `
})
export class AppFooterComponent {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
}
