import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error.component';
import { AppRoutingModule } from './app-routing.module';

import { ProductListComponent } from './product-list/product.list.component';
import { ProductEditComponent } from './product-edit/product.edit.component';
import { ProductCreateComponent } from './product-create/product.create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
