import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    templateUrl: './children.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class ChildrenComponent {
    constructor() {
        
    }
}