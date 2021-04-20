import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {Router} from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()
  buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor( private router: Router, private loginService: LoginService) { }
   username = "";

  ngOnInit() {
  }

  login() {
    this.loginService.setUserName(this.username)
    this.router.navigate([''])
  }

}



