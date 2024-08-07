import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    standalone: true,
    imports: [BreadcrumbModule]
})

export class BreadcrumbComponent {
    items: MenuItem[] | undefined;
    home: MenuItem | undefined = { icon: 'pi pi-home', routerLink: '/' };

    constructor() {
        const path = window.location.pathname;
        const parts = path.split('/').filter((part) => part !== '');
        if (parts.length === 0) {
            this.items = [
                { label: 'home', routerLink: '/' }
            ];
            return;
        }
        this.items = parts.map((part, index) => {
            return {
                label: part,
                routerLink: '/' + parts.slice(0, index + 1).join('/')
            };
        });
    }
    
}


