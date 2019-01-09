import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: Array<User> = [];
  username;
  hide = true;
  password;
  

  constructor(private toastr: ToastrService, private firebaseService: FirebaseService, private router: Router, private route: ActivatedRoute, private localStorage: LocalStorage) {
    
  }

  ngOnInit() {
    if (localStorage.getItem("user")) {
   
      this.router.navigate(['home'], { skipLocationChange: true });
    }
   
    this.firebaseService.getUserDetails().subscribe((_items) => {
      _items.forEach(item => {


       // console.log('hello sagar :' + item.username);
        this.users.push({
          key: item.key,
          login: item.login,
          password: item.password,
          username: item.username });
        
      });
    }); 
  
  }
  getUsers() {
    return this.users;
  }
login() {
  var myItem = localStorage.getItem("user");
  //console.log('  password :' + this.password + " user :" + this.username);
  var i = 0;
  this.users.forEach(user => {
    if (this.username == user.username && this.password == user.password) {
    //  console.log('hellow  user' + this.user_valid);
   
    
      i = 1;
      
    }

  });
  if (i == 1) {
    localStorage.setItem("user", this.username);
    var myItem = localStorage.getItem("user");
    this.toastr.success('Successfully Loggedin ! !', 'Login Sucess');
    this.router.navigate(['home'], { skipLocationChange: true });

  }
  if (i == 0) {
    //console.log('user does not exist');
    this.toastr.error('Please enter correct details !', 'Login Failed!');
    
  }
   
    /*
    this.firebaseService.getUserDetails(this.username).subscribe(book => {


      console.log('hello sagar ' + this.username+);

        //console.log("user name"+item.username);
       
          this.users.push({
            key: item.key,
            username: item.username,
            password: item.password,
            login: item.login
          });
       
   
    
    });
    */
  }

}
