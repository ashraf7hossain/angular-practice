import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AtuhGuard } from './gaurd/atuh.guard';
import { OrderComponent } from './order/order.component';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
  {path : '' , component: ProductsComponent},
  {path : 'products' , component: ProductsComponent },
  {path : 'employees' , component: EmployeeComponent },
  {path : 'cart' , component: CartComponent},
  {path : 'login' , component: LoginComponent},
  {path : 'signup' , component: SignupComponent},
  {path : 'dashboard' , component : DashboardComponent , canActivate: [AtuhGuard]},
  {path : 'user' , component : UserComponent},
  {path : 'order' , component : OrderComponent , canActivate: [AtuhGuard]},
  {path : 'addProducts' , component: AddProductsComponent, canActivate:[AtuhGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ProductsComponent , 
                                  EmployeeComponent, 
                                  CartComponent , 
                                  LoginComponent, 
                                  SignupComponent, 
                                  DashboardComponent, 
                                  UserComponent,
                                  OrderComponent,
                                  AddProductsComponent];
