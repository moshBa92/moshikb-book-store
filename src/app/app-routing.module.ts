import { EditBookComponent } from './edit-book/edit-book.component';
import { AuthComponent } from './auth/auth.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksDetailComponent } from './books-list/books-detail/books-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGourd } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books-list',
    pathMatch: 'full'
  },
  {
    path: 'books-list',
    component: BooksListComponent
  },
  {
    path: 'books-list/:isbn',
    component: BooksDetailComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'edit-book',
    canActivate: [AuthGourd],
    component: EditBookComponent
  },
  {
    path: '**',
    redirectTo: 'books-list',
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }