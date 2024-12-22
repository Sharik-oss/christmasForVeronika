import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SecondPageComponent } from './second-page/second-page.component';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'congratulations',
        component: SecondPageComponent
    }
];
