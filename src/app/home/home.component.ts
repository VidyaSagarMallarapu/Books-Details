import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from "../services/firebase.service";
import * as firebase from 'firebase/app';
import { map, filter, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";
import { Book } from '../interfaces/book';
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  favoriteBooks: Array<Book> = [];
  UnReadBooks: Array<Book> = [];
  user: Observable<firebase.User>;
  userid: any;
  constructor(private firebaseService: FirebaseService,private router: Router, private route: ActivatedRoute) {
    //this.userid = route.snapshot.params[''];
   // console.log('user ',this.userid);
    this.firebaseService.getBooks().subscribe((_items) => {
      _items.forEach(item => {
       
        if (item.rate > 4.0) {
          this.favoriteBooks.push({ key: item.key, imageUrl: item.imageUrl, title: item.title, dateread: null, rate:45 });
        }
      });
    }); 
             
    this.firebaseService.getBooks().subscribe((_items) => {
      _items.forEach(item => {

      
        if (! item.dateread  ) {
         
          this.UnReadBooks.push({ key: item.key, imageUrl: item.imageUrl, title: item.title, dateread: null, rate: 45 });
        }
      });
    });

        }
  ngOnInit() {
    
  }
}
