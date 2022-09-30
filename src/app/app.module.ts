import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';

import { ProductsService } from './services/products.service';
import { ApiService } from './services/api.service';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { UserComponent } from './user/user.component';
import { AtuhGuard } from './gaurd/atuh.guard';
import { SliderComponent } from './slider/slider.component';
import { OrderComponent } from './order/order.component';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    ProductsComponent,
    SliderComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
    
  ],
  providers: [ProductsService,ApiService,AuthService,AtuhGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
