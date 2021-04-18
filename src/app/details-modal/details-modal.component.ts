import {Component, Input, OnInit} from '@angular/core';
import {ArtPiece} from "../models/artPiece.model";

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  @Input('ArtPiece') artPiece: ArtPiece;

  thumbImage

  constructor() { }

  ngOnInit(): void {

    this.thumbImage = this.artPiece.imgURL !== undefined ? this.artPiece.imgURL.replace("/843,","/400,") : undefined

    console.log(this.thumbImage)

  }

}
