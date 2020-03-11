import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksDetailComponent } from './books-list/books-detail/books-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthComponent } from './auth/auth.component';
import { EditBookComponent } from './edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    BooksListComponent,
    BooksDetailComponent,
    ShoppingCartComponent,
    AuthComponent,
    EditBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
