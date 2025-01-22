import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./main/main.component').then(m => m.MainComponent);
        },
    }
];
