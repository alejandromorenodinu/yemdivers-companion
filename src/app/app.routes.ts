import { Routes } from '@angular/router';
import { App } from './app';
import { Map } from './map/map';
import { Home } from './home/home';
import { Dispatches } from './dispatches/dispatches';
import { About } from './about/about';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home Page',
    },
    {
        path: 'galactic-map',
        component: Map,
        title: 'Galactic Map',
    },
    {
        path: 'dispatches',
        component: Dispatches,
        title: 'Dispatches',
    },
    {
        path: 'about',
        component: About,
        title: 'About',
    },
    { 
        path: '**', 
        redirectTo: '' 
    },
];
