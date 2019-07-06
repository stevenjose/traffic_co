import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PAGES_ROUTE } from '../pages/pages.routes';

@NgModule({
    declarations: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
    ],
    exports: [
      NopagefoundComponent,
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      BrowserModule,
      CommonModule
    ],
  imports: [
    PAGES_ROUTE,
    BrowserModule,
    CommonModule
  ]
})

export class SharedModule{ }
