import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArtPiece } from '../models/artPiece.model';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../favourite.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DetailsModalComponent} from "../details-modal/details-modal.component";
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Output() cartCount: EventEmitter<any> = new EventEmitter();

  @Input('ArtPiece') artPiece: ArtPiece;
  @Input('show-actions') showActions = true;
  itemCount: Number;

  modalOptions = {
    size: 'lg',
    centered: true,
    scrollable: true
  };

  constructor(
    private cartService: CartService,
    private favouriteService: FavouriteService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
  }

  addToFavorites() {
    this.artPiece.toggle = !this.artPiece.toggle;
    if (this.artPiece.toggle) {
      this.favouriteService.addToFavourite(this.artPiece);
    } else {
      this.favouriteService.removeFavourite(this.artPiece);
    }
  }

  addToCart(content) {
    this.artPiece.inCart = true;
    this.cartService.addToCart(this.artPiece);
    this.itemCount= this.cartService.getCount();
    this.cartService.updateItemsCount(this.itemCount)
    //this.cartCount.emit(this.itemCount);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
  }

  removeFromCart() {

    //

    const modalRef = this.modalService.open(ConfirmDialogComponent)
    modalRef.componentInstance.title = 'Remove Item'
    modalRef.componentInstance.message = 'Are you sure you want to remove this item from your cart?'
    modalRef.result.then((result) => {
      if (result) {
        this.cartService.removeFromCart(this.artPiece);
        this.itemCount= this.cartService.getCount();
        this.cartService.updateItemsCount(this.itemCount)
        //this.cartCount.emit(this.itemCount);
        this.artPiece.inCart = false;
      }
    });
    //


    /*const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Item',
        message: 'Are you sure you want to remove this item from your cart?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.cartService.removeFromCart(this.artPiece);
        this.itemCount= this.cartService.getCount();
        this.cartCount.emit(this.itemCount);
        this.artPiece.inCart = false;
      }
    });*/

    /*let r = confirm("Are you sure you want to remove this item?");
    if (r == true) {
      this.cartService.removeFromCart(this.artPiece);
      this.itemCount= this.cartService.getCount();
      this.cartCount.emit(this.itemCount);
      this.artPiece.inCart = false;
    }*/
  }

  closeAddedToCartModal() {
    this.modalService.dismissAll();
  }

  showDetails(artPiece) {
    const modalRef = this.modalService.open(DetailsModalComponent, this.modalOptions)
    modalRef.componentInstance.artPiece = artPiece
    modalRef.componentInstance.cartCount.subscribe((cartCountFromDetailsModal) => {
      this.itemCount = cartCountFromDetailsModal;
      this.cartCount.emit(this.itemCount);
      })
  }
}

