import { NewProductosComponent } from './productos/new-productos.component';
import { RouterModule, Routes } from '@angular/router';
//Rutas
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProductosComponent } from './productos/productos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { InventarioComponent } from './inventario/inventario.component';
import { NewInventarioComponent } from './inventario/new-inventario.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dasboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'graficas1', component: Graficas1Component},
      {path: 'productos', component: ProductosComponent},
      {path: 'newProducto', component: NewProductosComponent},
      {path: 'proveedores', component: ProveedoresComponent},
      {path: 'tiendas', component: TiendasComponent},
      {path: 'inventario', component: InventarioComponent},
      {path: 'newInventario', component: NewInventarioComponent},
      {path: '', redirectTo: '/dasboard', pathMatch: 'full'}
    ]
  }
];

export const PAGES_ROUTE = RouterModule.forChild( pagesRoutes);
