import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './components/app.component';
import { TodoComponent } from './components/todo.component';
import { HeaderComponent } from './components/header.component';

// Importeer de NgxsModule en bijbehorende modules
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './state/todo.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([TodoState]),
    HeaderComponent,
    TodoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
