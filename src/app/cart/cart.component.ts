import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import {ArtPiece} from "../models/artPiece.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this._cartService.getItems();
  totalPrice: number = 0;

  @Output()
  buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  cartCount: EventEmitter<any> = new EventEmitter();

  itemCount: Number;
  inCart: boolean;

  constructor(  private _cartService: CartService) { }

  ngOnInit(): void {
    this.calculateTotal()
  }

  calculateTotal() {
    this.items.forEach(item => {
      this.totalPrice +=item.price
    });
  }

  reCalculateTotal() {

    let total = 0

    this.items.forEach(item => {
      total +=item.price
    });

    return total
  }

  closeCart() {
    this.buttonClicked.emit(true);
  }

  showAlert() {
    alert("Checkout functionality is not implemented !")
  }

  removeLocally(item){
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  removeItem(item){
    this._cartService.removeFromCart(item);
    this.itemCount= this._cartService.getCount();
    console.log("count: ", this.itemCount)
    this.cartCount.emit(this.itemCount);
    this.inCart = false;
    this.removeLocally(item);
    this.totalPrice = this.reCalculateTotal();
    (<ArtPiece>item).inCart = false;
  }
}
