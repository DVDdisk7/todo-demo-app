import { Component} from '@angular/core';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    standalone: true,
    imports: [BreadcrumbComponent]
})
export class AboutComponent {
    
}
