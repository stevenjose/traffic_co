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
import { NewTiendasComponent } from './tiendas/new-tiendas.component';
import { NewProveedoresComponent } from './proveedores/new-proveedores.component';


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
      {path: 'newProducto/:id', component: NewProductosComponent, data: { titulo: 'Actualizar Producto' } },
      {path: 'proveedores', component: ProveedoresComponent},
      {path: 'newProveedor/:id', component: NewProveedoresComponent, data: { titulo: 'Actualizar Proveedor' } },
      {path: 'newProveedor', component: NewProveedoresComponent, data: { titulo: 'Crear Proveedor' } },
      {path: 'tiendas', component: TiendasComponent},
      {path: 'newTiendas', component: NewTiendasComponent, data: { titulo: 'Crear Tienda' } },
      {path: 'newTiendas/:id', component: NewTiendasComponent, data: { titulo: 'Actualizar Tienda' } },
      {path: 'inventario', component: InventarioComponent},
      {path: 'newInventario', component: NewInventarioComponent},
      {path: 'newInventario/:id', component: NewInventarioComponent, data: { titulo: 'Actualizar Inventario' } },
      {path: '', redirectTo: '/proveedores', pathMatch: 'full'}
    ]
  }
];

export const PAGES_ROUTE = RouterModule.forChild( pagesRoutes);
