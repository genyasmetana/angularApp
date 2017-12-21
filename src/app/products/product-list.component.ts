import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from "./product.service";
import {error} from "util";

@Component({
  styleUrls: ['./product-list.component.scss'],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  showImg: boolean = false;
  _listFilter: string;
  errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  filteredProducts: IProduct[];
  products: IProduct[] = [ ];

  constructor( private _productService: ProductService) {

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImg = !this.showImg;
  }
  ngOnInit(): void {
    this._productService.getProducts()
      .subscribe(products =>  {
        this.products = products;
        this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error);
  }
}


