import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-page-not',
  templateUrl: './page-not.component.html',
  styleUrls: ['./page-not.component.css']
})
export class PageNotComponent implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorage) { }

  ngOnInit() {
  }
  home() {
    var m = localStorage.getItem('user');
    if (m == null) {
      this.router.navigate(['/']);
    }
    else {
      console.log('home ' + m);
      this.router.navigate(['/']);
    }
  }

}
