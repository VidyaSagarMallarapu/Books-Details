import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  id;
  author;
  title;
  dateadded;
  dateread;
  description;
  imageUrl;
  price;
  rate;

  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { }
  readDate(type: string, event: MatDatepickerInputEvent<Date>) {
    var d = new Date(event.value);
    var day = d.getDate();

    var month = d.getUTCMonth() + 1;
    var year = d.getFullYear();
    var date = day + '-' + month + '-' + year;
    this.dateread = date;

  }
  submitEdit() {
    let book = {
      author: this.author,
      title: this.title,
      
      dateadded: this.dateadded,
      dateread: this.dateread,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.price,
      rate: this.rate
    }

    this.firebaseService.updateBook(this.id, book);
    //console.log('Updated the edited data ' + this.id);
    this.router.navigate(['/books'], { skipLocationChange:true})
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

}
