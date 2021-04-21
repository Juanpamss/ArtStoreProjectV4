import { Injectable } from '@angular/core';
import { ArtPiece } from '../models/artPiece.model';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsCount = new BehaviorSubject<Number>(0)

  currentItemsCount = this.itemsCount.asObservable()

  items = [];
  constructor() {}

  updateItemsCount(count){
    console.log("new count: ", count)
    this.itemsCount.next(count)
  }

  addToCart(product) {
    this.items.push(product);
  }

  removeFromCart(artPiece: ArtPiece) {
    for( var i = 0; i < this.items.length; i++){
      if ( this.items[i].title === artPiece.title) {
        this.items.splice(i, 1);
      }
    }
  }

  getItems() {
    return this.items;
  }

  getLastItem() {
    return this.items[this.items.length-1]
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getCount(): Number {
    return this.items.length;
  }
}
//https://angular.io/start/start-data
