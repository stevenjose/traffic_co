import { NgModule } from '@angular/core';
import { PAGES_ROUTE } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ProductosComponent } from './productos/productos.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { InventarioComponent } from './inventario/inventario.component';
import { NewInventarioComponent } from './inventario/new-inventario.component';
import { NewProductosComponent } from './productos/new-productos.component';
import { UpdateInventarioComponent } from './inventario/update-inventario.component';
import { NewProveedoresComponent } from './proveedores/new-proveedores.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    ProductosComponent,
    ProveedoresComponent,
    TiendasComponent,
    InventarioComponent,
    NewInventarioComponent,
    NewProductosComponent,
    UpdateInventarioComponent,
    NewProveedoresComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [
    SharedModule,
    PAGES_ROUTE,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule
  ]
})

export class PagesModule{ }
