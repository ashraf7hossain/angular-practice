import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : '' , component: ProductsComponent},
  {path : 'products' , component: ProductsComponent },
  {path : 'employees' , component: EmployeeComponent },
  {path : 'cart' , component: CartComponent},
  {path : 'login' , component: LoginComponent},
  {path : 'signup' , component: SignupComponent},
  {path : 'dashboard' , component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ProductsComponent , EmployeeComponent, CartComponent , LoginComponent, SignupComponent, DashboardComponent];
