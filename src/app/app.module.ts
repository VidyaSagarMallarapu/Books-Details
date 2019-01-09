import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import { AngularFireDatabaseModule,AngularFireObject} from 'angularfire2/database';
import { AppComponent } from './app.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import {
  MatTableModule ,
  MatButtonModule,
  MatMenuModule,
  MatCheckboxModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatDatepickerModule,

  MatNativeDateModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatSidenavModule
} from '@angular/material';

import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { Observable ,  Subject ,  Subscription } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotComponent } from './page-not/page-not.component';
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HomeComponent,
    BooksComponent,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    PageNotComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule ,
    MatButtonModule,
    AngularFireAuthModule ,
    MatCheckboxModule,
    MatNativeDateModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    ToastrModule,
    MatSidenavModule,
    ToastrModule.forRoot() ,

    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule, FormsModule,

    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
     
      {
        path: 'nav',
        component: NavbarComponent
      },
      {
        path: '',
        component : LoginComponent
      },
      {
        path: 'Register',
        component: RegisterComponent
      },
      {
        path: 'books',
        component: BooksComponent

      },
      {
        path: 'book/:id',
        component: BookComponent

      },
      {
        path: 'add-book',
        component: AddBookComponent

      },
      {
        path: 'delete-book/:id',
        component: DeleteBookComponent
      },
      {
        path: 'edit-book/:id',

        component: EditBookComponent

      },
      {
        path: '**',
        component: PageNotComponent
      }

    ]),

    BrowserAnimationsModule,

    NgbModule.forRoot()


  ],
  providers: [FirebaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
