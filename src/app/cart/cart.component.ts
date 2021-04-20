import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import {ArtPiece} from "../models/artPiece.model";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  constructor(
    private _cartService: CartService,
    private dialog: MatDialog,
    private modalService: NgbModal
  ) { }

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

    const modalRef = this.modalService.open(ConfirmDialogComponent)
    modalRef.componentInstance.title = 'Remove Item'
    modalRef.componentInstance.message = 'Are you sure you want to remove this item from your cart?'
    modalRef.result.then((result) => {
      if (result) {
        this._cartService.removeFromCart(item);
        this.itemCount= this._cartService.getCount();
        this.cartCount.emit(this.itemCount);
        this.inCart = false;
        this.removeLocally(item);
        this.totalPrice = this.reCalculateTotal();
        (<ArtPiece>item).inCart = false;
      }
    });

    /*const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Item',
        message: 'Are you sure you want to remove this item from your cart?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this._cartService.removeFromCart(item);
        this.itemCount= this._cartService.getCount();
        console.log("count: ", this.itemCount)
        this.cartCount.emit(this.itemCount);
        this.inCart = false;
        this.removeLocally(item);
        this.totalPrice = this.reCalculateTotal();
        (<ArtPiece>item).inCart = false;
      }
    });*/
  }
}
