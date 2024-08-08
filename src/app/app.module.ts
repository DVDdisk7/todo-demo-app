import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header.component';

// Router
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

// Importeer de NgxsModule en bijbehorende modules
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

// Importeer de state
import { TodoState } from './home/state/todo.state';
import { BreadcrumbComponent } from "./core/components/breadcrumb.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([TodoState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ keys: '*'}),
    HeaderComponent,
    BreadcrumbComponent,
    RouterModule.forRoot(routes),
    NgxsReduxDevtoolsPluginModule.forRoot(),
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
