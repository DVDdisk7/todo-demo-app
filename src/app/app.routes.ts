import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./home/pages/home.page').then(m => m.HomePage)
    },
    {
        path: "home",
        loadComponent: () => import('./home/pages/home.page').then(m => m.HomePage)
    },
    {
        path: "about",
        loadComponent: () => import('./about/pages/about.page').then(m => m.AboutPage)
    },
    {
        path: "about/help",
        loadComponent: () => import('./help/pages/help.page').then(m => m.HelpPage)
    },
    {
        // Redirect crap to home
        path: "**",
        redirectTo: ""
    }
];