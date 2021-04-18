import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ArtPiece} from "../models/artPiece.model";
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  @Input('ArtPiece') artPiece: ArtPiece;
  @Output() cartCount: EventEmitter<any> = new EventEmitter();

  inCart: boolean;
  itemCount: Number;

  thumbImage

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {

    this.thumbImage = this.artPiece.imgURL !== undefined ? this.artPiece.imgURL.replace("/843,","/400,") : undefined

    console.log(this.thumbImage)

  }

  addToCart(content) {
    this.inCart = true;
    this.cartService.addToCart(this.artPiece);
    this.itemCount= this.cartService.getCount();
    this.cartCount.emit(this.itemCount);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
      })
  }

  closeCart() {
    this.modalService.dismissAll();
  }
  closeAddedToCartModal() {
    this.modalService.dismissAll();
  }

}
