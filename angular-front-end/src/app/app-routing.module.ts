import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ErrorComponent } from './error.component';
import { ProductListComponent } from './product-list/product.list.component';
import { ProductEditComponent } from './product-edit/product.edit.component';
import { ProductCreateComponent } from './product-create/product.create.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'list', component: ProductListComponent},
  { path: 'create', component: ProductCreateComponent },
  { path: 'update/:id', component: ProductEditComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
