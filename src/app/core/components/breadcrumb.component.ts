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
            console.log(state);
            
            // Find all the firstChilds until the last one
            let breadcrumbPath = "";
            let urlPath = "";
            let currentChild = state?.root.firstChild;
            while (currentChild) {
                console.log(currentChild);
                urlPath += '/' + currentChild.url.join('/');
                breadcrumbPath += '/' + currentChild.data.breadcrumb;
                currentChild = currentChild.firstChild;
            }
            console.log(urlPath);

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


