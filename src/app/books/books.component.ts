import { Component, OnInit } from '@angular/core';
import { Observable ,  Subject ,  Subscription } from 'rxjs';
import { FirebaseService } from "../services/firebase.service";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  allBooks: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getBooks().subscribe(books => {
      this.allBooks = books;

    })
  }

}
