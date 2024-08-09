import { Component} from '@angular/core';
import { BreadcrumbComponent } from "../../core/components/breadcrumb.component";
import { RouterModule } from '@angular/router';

@Component({
    templateUrl: './about.page.html',
    standalone: true,
    imports: [BreadcrumbComponent, RouterModule]
})
export class AboutPage {
    
}
