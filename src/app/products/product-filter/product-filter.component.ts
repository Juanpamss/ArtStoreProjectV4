import {Component, Input, OnInit, ViewChildren} from '@angular/core';
import {artapiService} from "../../services/artapi.service";
import {ProductsComponent} from "../products.component";

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  @ViewChildren('myItem') item;

  constructor(
    private _artPieceService : artapiService,
    private  _product : ProductsComponent
  ) {}

  ngOnInit(){}

  filteredArtPiecesList = []

  OnCheckboxSelect(option, event) {

    //console.log(this._product.artPiecesToDisplay)

    this.filteredArtPiecesList = []

    if (event.target.checked === true) {
      if(option.search("price-")<0){
        this._product.selectedClassification.push({option: option, checked: event.target.checked});
      }else{
        this._product.selectedPrice.push({option: option, checked: event.target.checked});
      }

    }
    if (event.target.checked === false) {
      if(option.search("price-")<0) {
        this._product.selectedClassification = this._product.selectedClassification.filter((item) => item.option !== option);
      }else{
        this._product.selectedPrice = this._product.selectedPrice.filter((item) => item.option !== option);
      }
    }

    //If only the Category filters where selected
    if(this._product.selectedPrice.length === 0 && this._product.selectedClassification.length > 0){
      this._artPieceService.listArtPieces.forEach(data => {
        this._product.selectedClassification.forEach(busc => {
          if(data.classification_title.toLowerCase() === busc.option.toLowerCase()){
            this.filteredArtPiecesList.push(data)
          }
        })
      })
    }
    //If only the Price filters where selected
    else if(this._product.selectedPrice.length > 0 && this._product.selectedClassification.length === 0){
      this._artPieceService.listArtPieces.forEach(data => {
        this._product.selectedPrice.forEach(busc => {
          let option = busc.option;
          var auxOption = option.replace("price-", "");
          if(parseFloat(auxOption) === 500){
            if(data.price >= 0 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 1000){
            if(data.price >= 500 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 1500){
            if(data.price >= 1000 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 2000){
            if(data.price >= 1500 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 3000){
            if(data.price >= 2000 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 4000){
            if(data.price >= 3000 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }
        })
      })
    }else{
      //Auxiliar list to filter art pieces by calssification and price
      let auxList = []
      this._artPieceService.listArtPieces.forEach(data => {
        this._product.selectedClassification.forEach(busc => {
          if(data.classification_title.toLowerCase() === busc.option.toLowerCase()){
            this.filteredArtPiecesList.push(data)
          }
        })
      })

      this.filteredArtPiecesList.forEach(data => {
        this._product.selectedPrice.forEach(busc => {
          let option = busc.option;
          var auxOption = option.replace("price-", "");
          if(parseFloat(auxOption) === 500){
            if(data.price >= 0 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 1000){
            if(data.price >= 500 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 1500){
            if(data.price >= 1000 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 2000){
            if(data.price >= 1500 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 3000){
            if(data.price >= 2000 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 4000){
            if(data.price >= 3000 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }
          this.filteredArtPiecesList = auxList
        })
      })
    }

    //console.log('Selected Ids ', this.selectedOptions)

    this._product.artPiecesToDisplay = this.filteredArtPiecesList
    this._product.totalCount = this.filteredArtPiecesList.length

    if(this._product.selectedClassification.length === 0 && this._product.selectedPrice.length === 0){
      this._product.artPiecesToDisplay = this._artPieceService.listArtPieces
    }
  }
}
