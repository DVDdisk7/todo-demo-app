import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        title: "Home",
        path: "",
        loadComponent: () => import('./home/pages/home.page').then(m => m.HomePage),
        data: {
            breadcrumb: "Home"
        }
    },
    {
        title: "Home",
        path: "home",
        loadComponent: () => import('./home/pages/home.page').then(m => m.HomePage),
        data: {
            breadcrumb: "Home"
        }
    },
    {
        title: "About",
        path: "about",
        loadComponent: () => import('./about/pages/about.page').then(m => m.AboutPage),
        data: {
            breadcrumb: "Over"
        },
        children: [
            {
                title: "Children",
                path: "children",
                loadComponent: () => import('./about/components/children.component').then(m => m.ChildrenComponent),
                data: {
                    breadcrumb: "Children"
                },
                children: [
                    {
                        title: "Grand Children",
                        path: "grand-children",
                        loadComponent: () => import('./about/components/childrenOfChildren.component').then(m => m.ChildrenOfChildrenComponent),
                        data: {
                            breadcrumb: "Grand Children"
                        }
                    }
                ]

            },
            {
                title: "Children 2",
                path: "children2",
                loadComponent: () => import('./about/components/children.component').then(m => m.ChildrenComponent),
                data: {
                    breadcrumb: "Children 2"
                }
            }
        ]

    },
    {
        title: "Help",
        path: "about/help",
        loadComponent: () => import('./help/pages/help.page').then(m => m.HelpPage),
        data: {
            breadcrumb: "Over/Help"
        }
    },
    {
        // Redirect crap to 404
        title: "404 Not Found",
        path: "**",
        loadComponent: () => import('./error/pages/404.page').then(m => m.Error404Page),
    }
];