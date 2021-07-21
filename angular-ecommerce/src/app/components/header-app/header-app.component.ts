
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { ProductCategory } from 'src/app/common/product-category';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {

  productCategories: ProductCategory[];
  HideOrShow=false;
  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  constructor(private router: Router , private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.listProductCategories();
    this.updateCartStatus();
   }

   updateCartStatus() {

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  hide_show(){
    this.HideOrShow=! this.HideOrShow;
  }



}


