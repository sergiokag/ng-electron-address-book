import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';

// Components
import { AppComponent } from './app.component';
import { SearchInputComponent } from 'src/app/components/search-input/search-input.component';
import { AddressBookFormComponent } from './components/address-form/address-book-form.component';
import { AddressBookListComponent } from 'src/app/components/address-book-list/address-book-list.component';
import { ReactiveFormsModule } from '@angular/forms';


// Pipes
import { UKPhonePipe } from './pipes/uk-phone.pipe';

// Store
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    AddressBookFormComponent,
    AddressBookListComponent,
    UKPhonePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
