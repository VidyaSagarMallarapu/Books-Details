import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  author: string;
  title: string;
  price: number;
  dateadded: string;
  dateread: string;
  description: string;
  imageUrl: string;
  rate: number;
  isRead: boolean = false;
  constructor(private firebaseService: FirebaseService, private router: Router, private datePipe: DatePipe) {
   
  } 
   convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

  ngOnInit() {
  }

  addedDate(type: string, event: MatDatepickerInputEvent<Date>) {
   
    var d = new Date(event.value);
   
    var day = d.getDate();
    var month = d.getUTCMonth() + 1;
    var year = d.getFullYear();
    var date = day + '-' + month + '-' + year;
    this.dateadded = date;
  }
  readDate(type: string, event: MatDatepickerInputEvent<Date>) {
    var d = new Date(event.value);
    var day = d.getDate();
    
    var month = d.getUTCMonth() + 1;
    var year = d.getFullYear();
    var date = day + '-' + month + '-' + year;
    this.dateread = date;
    this.isRead = true;
  }

  submitAdd() {
    if (! this.dateadded) { this.dateadded = null; }
    if (! this.dateread) { this.dateread = null; }
    if (! this.rate) { this.rate = null; }
    if (! this.price) { this.price = null; }
    if (! this.description) { this.description = null; }
    let book = {
      author: this.author,
      title: this.title,
      price: this.price,
      
      dateadded: this.dateadded,
      dateread: this.dateread,
      description: this.description,
      rate: this.rate,
      imageUrl: this.imageUrl
    }

   // console.log('Book - ', book);
    this.firebaseService.addBook(book);
    
    this.router.navigate(['books'],{ skipLocationChange: true });

  }

}
