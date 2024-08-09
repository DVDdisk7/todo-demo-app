import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Store } from '@ngxs/store';
import { Logout } from '../../auth/state/auth.state';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, Button]
})
export class HeaderComponent implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private store: Store, private router: Router) {}
    
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
                    {
                        label: 'Children',
                        icon: 'pi pi-users',
                        routerLink: '/about/children',
                        items: [
                            {
                                label: 'Grandchildren',
                                icon: 'pi pi-user-plus',
                                routerLink: '/about/children/grand-children',
                            }
                        ]
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

    logout() {
        console.log('logging out');
        this.store.dispatch(new Logout());
        this.router.navigate(['/login']);
    }

}
