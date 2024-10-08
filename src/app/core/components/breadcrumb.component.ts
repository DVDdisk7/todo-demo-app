import { Component, inject } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { RouterDataResolved, RouterState } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    standalone: true,
    imports: [BreadcrumbModule]
})

export class BreadcrumbComponent {
    items: MenuItem[] | undefined;
    home: MenuItem | undefined = { icon: 'pi pi-home', routerLink: '/' };

    constructor(private store: Store) {
        this.store.select(RouterState.state).subscribe((state: any) => {
            
            let breadcrumbPath = "";
            let urlPath = "";

            let currentChild = state?.root.firstChild.firstChild; // Because the first child is MAIN-route and the second is the actual page
            while (currentChild) {
                console.log(currentChild);
                urlPath += '/' + currentChild.url.join('/');
                breadcrumbPath += '/' + currentChild.data.breadcrumb;
                currentChild = currentChild.firstChild;
            }

            this.items = breadcrumbPath?.split('/').filter(part => part != "").map((part: string, index: number) => {
                return {
                    label: part,
                    routerLink: '/' + urlPath.split('/').slice(0, index + 2).join('/')
                };
            });
        }
        )
    }
}


