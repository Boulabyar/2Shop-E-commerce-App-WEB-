import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  products : Product[] = [];
  productsPython : Product[] = [];
  productsJavaScript : Product[] = [];
  productsSQL : Product[] = [];
  productsCollection : Product[] = [];


  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 50;
  theTotalElements: number = 0;

  previousKeyword: string = null;
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    window.scroll(0,0);
    this.route.paramMap.subscribe(() => {
      this.list_java_Products();
    });
      ///////////////////////////
      this.route.paramMap.subscribe(() => {
        this.list_python_Products();
    });
    /////////////////////////////
    this.route.paramMap.subscribe(() => {
      this.list_javaScript_Products();
  });
  ///////////////////////////////
  this.route.paramMap.subscribe(() => {
    this.list_sql_Products();
  });

  }

  list_java_Products() {
      this.handleListJavaProducts();
  }

  handleListJavaProducts() {
      this.currentCategoryId = 1;

    this.previousCategoryId = this.currentCategoryId;

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,1)
      .subscribe(this.processResultJava());
  }

  processResultJava() {
    return data => {
      this.products = data._embedded.products;
    };
  }

  /////////// Python //////////////////

  list_python_Products() {
    this.handleListPythonProducts();
}

handleListPythonProducts() {
    this.currentCategoryId = 3;

  this.previousCategoryId = this.currentCategoryId;

  // now get the products for the given category id
  this.productService.getProductListPaginate(this.thePageNumber - 1,
    3,3)
    .subscribe(this.processResultPython());
}

processResultPython() {
  return data => {
    this.productsPython = data._embedded.products;
  };
}

///////// JavaScript //////////////
list_javaScript_Products() {
  this.handleListJavaScriptProducts();
}

handleListJavaScriptProducts() {
  this.currentCategoryId = 2;

this.previousCategoryId = this.currentCategoryId;

// now get the products for the given category id
this.productService.getProductListPaginate(this.thePageNumber - 1,
  4,2)
  .subscribe(this.processResulJavaScript());
}

processResulJavaScript() {
return data => {
  this.productsJavaScript = data._embedded.products;
};
}

///////// SQL //////////////
list_sql_Products() {
  this.handleListSQLProducts();
}

handleListSQLProducts() {
  this.currentCategoryId = 2;

this.previousCategoryId = this.currentCategoryId;

// now get the products for the given category id
this.productService.getProductListPaginate(this.thePageNumber - 1,
  2,2)
  .subscribe(this.processResulSQL());
}

processResulSQL() {
return data => {
  this.productsSQL = data._embedded.products;
};
}

/////// addToCart ////////////
addToCart(theProduct: Product) {

  console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

  // TODO ... do the real work
  const theCartItem = new CartItem(theProduct);

  this.cartService.addToCart(theCartItem);
}


}