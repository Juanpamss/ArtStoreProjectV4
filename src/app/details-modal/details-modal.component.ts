import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ArtPiece} from "../models/artPiece.model";
import { CartService } from '../services/cart.service';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  @Input('ArtPiece') artPiece: ArtPiece;

  inCart: boolean;
  itemCount: Number;

  thumbImage

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {

    this.thumbImage = this.artPiece.imgURL !== undefined ? this.artPiece.imgURL.replace("/843,","/400,") : undefined
  }

  addToCart(content) {
    this.artPiece.inCart = true;
    this.cartService.addToCart(this.artPiece);
    this.itemCount= this.cartService.getCount();
    this.cartService.updateItemsCount(this.itemCount)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
      })
  }

  removeFromCart() {
    const modalRef = this.modalService.open(ConfirmDialogComponent)
    modalRef.componentInstance.title = 'Remove Item'
    modalRef.componentInstance.message = 'Are you sure you want to remove this item from your cart?'
    modalRef.result.then((result) => {
      if (result) {
        this.cartService.removeFromCart(this.artPiece);
        this.itemCount= this.cartService.getCount();
        this.cartService.updateItemsCount(this.itemCount)
        this.artPiece.inCart = false;
      }
    });
  }

  dismissAllModals() {
    this.modalService.dismissAll();
  }
}
