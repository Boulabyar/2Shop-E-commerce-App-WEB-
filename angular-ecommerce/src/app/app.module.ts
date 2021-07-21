import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { HeaderAppComponent } from './components/header-app/header-app.component';

import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import { HttpClientModule } from '@angular/common/http';

const oktaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},

  {path : '', component: IndexComponent},
  {path : 'index', component: IndexComponent},
  {path : 'contact-us', component: ContactUsComponent},
  {path : 'about-us', component: AboutUsComponent},
  {path : 'cart-details', component: CartDetailsComponent},
  {path : 'checkout', component: CheckoutComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryMenuComponent,
    HeaderAppComponent,
    HomeComponent,
    IndexComponent,
    FooterComponent,
    ContactUsComponent,
    AboutUsComponent,
    CartDetailsComponent,
    CheckoutComponent,
    ProductListComponent,
    CartStatusComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OktaAuthModule
  ],

  providers: [ProductService , { provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
