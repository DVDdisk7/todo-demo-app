import { Component} from '@angular/core';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    standalone: true,
    imports: [ BreadcrumbComponent ]
})
export class HelpComponent {
    
}
