import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
@Input() public parentData: any;

  products: any[] = [
    {
      name: "T-shirt",
      id: 1
    },
    {
      name: "Pants",
      id: 2
    },
    {
      name: "Shirt",
      id: 3
    },
    {
      name: "Jersey",
      id : 4
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.products.push({
      name: "Punjabi",
      id : this.products.length + 1
    });
  }
  deleteIt(id: any){
    this.products = this.products.filter(product => product.id !== id);
    console.log(this.products,id);
  }

}
