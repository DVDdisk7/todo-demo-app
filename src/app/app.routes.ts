import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./todo/components/todo.component').then(m => m.TodoComponent)
    },
    {
        path: "home",
        loadComponent: () => import('./todo/components/todo.component').then(m => m.TodoComponent)
    },
    {
        path: "home/subpage",
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: "about",
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: "about/help",
        loadComponent: () => import('./help/help.component').then(m => m.HelpComponent)
    },
    {
        // Redirect crap to home
        path: "**",
        redirectTo: ""
    }
];