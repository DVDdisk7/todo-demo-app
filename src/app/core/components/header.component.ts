import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule]
})
export class HeaderComponent implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private store: Store) {}
    
    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/',
            },
            {
                label: 'About',
                icon: 'pi pi-info-circle',
                routerLink: '/about',
                items: [
                    {
                        label: 'Help',
                        icon: 'pi pi-question-circle',
                        routerLink: '/about/help',
                    },
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                url: 'mailto:d.jongeneel@depotsoftware.com',
            }
        ];
    }
}
