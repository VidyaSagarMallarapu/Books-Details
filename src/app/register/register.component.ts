import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import { map, filter, switchMap } from 'rxjs/operators';
import 'core-js/es6/reflect';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ToastrService } from 'ngx-toastr';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username :string;
  password;
  fullname;
  onLine;
  hide = true;
  where: boolean = false;
  constructor(private toastr: ToastrService,private firebaseService: FirebaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   

  }
  register() {

    var line: string;
    this.where = false;
    this.onLine = this.firebaseService.getUserDetail(this.username).subscribe(books => {
      
      if (books) {
        this.onLine = books;
        line = books.username;
        this.error(line);

      }
      else {
        this.reg(line);
        this.where = true;

      }
    }
    );

    
  }
  error(line) {
    if (!this.where) {
      this.toastr.error(' Try with another userId  ', this.onLine.username + ' :- user already exist !');
    }
  }
  reg(line) {
    if (!line) {

    

      let user = {
        username: this.username,
        password: this.password,
        fullname: this.fullname
      }
      this.update(user);
      this.toastr.success('Sucessfully registered user ! :' + this.username, 'Registration sucessfull!');

      this.router.navigate(['Register'], { skipLocationChange: true });
    }
  }
  update(user) {
          this.firebaseService.addUser(this.username, user, this.username);

  }

}
