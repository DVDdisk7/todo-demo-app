import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

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
                command: () => this.navigate('')
            },
            {
                label: 'About',
                icon: 'pi pi-info-circle',
                command: () => this.navigate('about'),
                items: [
                    {
                        label: 'Help',
                        icon: 'pi pi-question-circle',
                        command: () => this.navigate('about/help')
                    },
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ];
    }

    navigate(route: string) {
        this.store.dispatch(new Navigate([route]));
    }
}
