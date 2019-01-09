import { Component, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { HomeComponent } from '../home/home.component';
import { BooksComponent } from '../books/books.component';
import { AddBookComponent } from '../add-book/add-book.component';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { EventEmitter } from "events";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  authenticated: boolean = false;
  imageUrl = './index.png';
  constructor(private router: Router, private localStorage: LocalStorage) {
   
  }

  ngOnInit() {
  }
  login() {
    /*
    this.as.login();
    console.log(this.authenticated);
   this.authenticated = true;
   
    this.authenticated = true;
    this.au.auth.signInWithPopup(provider)
      .then((result) => {
        
        console.log('Signed in successfully!');
      }).catch((error) => {
        this.authenticated = false;
        
        console.log('Error signing in: ', error);

      })
      */
  }

  logout() {
    //console.log('logout');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    //this.au.auth.signOut();
    /*
      .then((result) => {
        this.router.navigate(['']).then(function () {
          window.location.reload();
          this.authenticated = false;
        });
        console.log('You were logged out successfully!');
      }).catch((error) => {
        this.authenticated = true;
        console.log('Error signing out: ', error);
      })
      */
  }

}
