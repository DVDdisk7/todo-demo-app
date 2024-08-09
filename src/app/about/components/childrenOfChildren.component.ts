import { Component } from '@angular/core';

@Component({
    templateUrl: './childrenOfChildren.component.html',
    standalone: true,
    imports: []
})
export class ChildrenOfChildrenComponent {
    constructor() {
        console.log('im loaded');
    }
}