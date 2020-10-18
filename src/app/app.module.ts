import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { InvalidMessageComponent } from './components/auth/invalid-message/invalid-message.component';
import { environment } from '../environments/environment';
import { LoaderDataComponent } from './components/loader-data/loader-data.component';
import { BookRedactorComponent } from './components/book-redactor/book-redactor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    EditBookComponent,
    CreateBookComponent,
    NotFoundComponent,
    AuthComponent,
    BackdropComponent,
    InvalidMessageComponent,
    LoaderDataComponent,
    BookRedactorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
