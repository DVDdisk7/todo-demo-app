import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header.component';

@Component({
  templateUrl: './main.page.html',
  standalone: true,
  imports: [RouterModule, HeaderComponent]
})
export class MainPage {
}
