import { Component, Input, OnInit } from '@angular/core';
import { artapiService } from '../services/artapi.service';
import { Router } from '@angular/router';
import { SearchResultsModel } from '../models/SearchResults.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login.service';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  searchInput: string;

  searchResults: SearchResultsModel[];

  cartCount: Number;

  constructor(
    private _artapiService: artapiService,
    private router: Router,
    private modalService: NgbModal,
    private loginService: LoginService,
    private _cartService: CartService
  ) {}

  closeResult: string;
  title = '';
  userName = 'Login'

  ngOnInit(): void {
    this.userName = this.loginService.getUsername();
    this._cartService.currentItemsCount.subscribe(count => this.cartCount = count)
  }

  getFormData(formData) {
    let userInput = formData.value.searchInput;

    this.redirectTo(userInput)
  }

  redirectTo(userInput) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/products'], {
        queryParams: {userInput: userInput}
      })
    )
  }

  openCart(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result; //.then((result) => {
  }

  openFavourite(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result; //.then((result) => {
  }

  closeFavourite(valueEmitted) {
    this.modalService.dismissAll();
  }

  closeShoppingCart(valueEmitted) {
    this.modalService.dismissAll();
  }
}
