import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import 'rxjs/add/operator/catch';
import { map, filter, switchMap } from 'rxjs/operators';
import 'core-js/es6/reflect';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit  {
  books: any;
  bookDetails: any; //from Firebase
  favoriteBooks: any;
  users:any;
  unreadBooks: Observable<any>;
  CurrentUser: string;
  UserDetail: any;
  constructor(private toastr: ToastrService,private db: AngularFireDatabase, private localStorage: LocalStorage) {
    
  }
  ngOnInit() {
    
  }
  getUserDetails() {
    this.users = this.db.list('/users').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
    
    
    return this.users;
  }
  getBooks() {

    this.books = this.db.list('/data/' + localStorage.getItem('user')+'/books').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
    return this.books;
  }
  addUser(userid,UserDetails, id) {
    const obj = this.db.database.ref('/users/' + id);
    this.db.list('/users').update(userid, UserDetails);
    //this.toastr.success('successfully added user', 'Sucsess!');
    //obj.push(userid,UserDetails);
  }
  getBookDetails(id) {
    this.bookDetails = this.db.object('/data/' + localStorage.getItem('user')+'/books/' + id).valueChanges();
    
    return this.bookDetails;
  }
  getUserDetail(id) {
    this.UserDetail = this.db.object('/users/' + id).valueChanges();
    
    return this.UserDetail;
  }
  addBook(bookDetails) {

    const obj = this.db.database.ref('/data/' + localStorage.getItem('user')+'/books/');
    obj.push(bookDetails);
  }
  updateBook(id, bookDetails) {
    /*
   // const obj = this.db.database.ref('/'+this.CurrentUser+'/books/');
    //obj.update(id,bookDetails);
    this.db.object('/data/' + localStorage.getItem('user') + '/books/' + id).valueChanges().subscribe(books => {
      this.bookDetails = books;

    });
    var mn = this.bookDetails.author;
    this.toastr.error(' ' + mn , 'Login Failed!');
    var alignFillDate = new Date("2015-06-09");
    var pickUpDate = new Date("2015-05-10");
    if (pickUpDate < alignFillDate) {
      this.toastr.error('Please date is not good man !', 'Login Failed!');
     
    }
    */
   var filteredBook = JSON.parse(JSON.stringify(bookDetails)); //removes the undefined fields
    this.db.database.ref().child('/data/' + localStorage.getItem('user')+'/books/' + id + '/').update(filteredBook);
   // console.log('ellow error may at:' + id);
  }
  deleteBook(id) {
   // const obj = this.db.database.ref('/' + localStorage.getItem('user')+'/books/');
   // obj.remove(id);
  //  console.log('ellow error may at:' + id);
    this.db.database.ref().child('/data/' + localStorage.getItem('user')+'/books/' + id + '/').remove();
    console.log('ellow error may at: samaram completed ' + id);
   // this.bookDetails.remove(id).valueChanges();
  }
}
