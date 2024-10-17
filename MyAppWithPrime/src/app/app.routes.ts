import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AppMainComponent } from './app.main.component';

export const routes: Routes = [

    {
        path: '',
        component: AppMainComponent,
        children: [
            { path: 'start', component: LandingComponent }
        ]
    },
    { path: 'notfound', loadChildren: () => import('@pages/notfound/notfound.module').then((m) => m.NotFoundModule) },
    { path: '**', redirectTo: '/start' }
];
