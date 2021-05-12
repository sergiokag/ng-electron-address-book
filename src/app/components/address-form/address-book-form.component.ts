import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/reducers";
import * as AddressBooksActions from '../../store/actions';

@Component({
  selector: 'app-address-book-form',
  templateUrl: './address-book-form.component.html',
  styleUrls: ['./address-book-form.component.scss']
})
export class AddressBookFormComponent implements OnInit{
  title = 'Add Entry'
  form !: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = this._fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.pattern("^[0-9]{10}$")]]
    });
  }

  public onSubmit(): void {
    if (this.form.valid && this.form.dirty) {

      const entry = {
        id: Date.now() * Math.random(),
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        phoneNumber: this.form.value.phoneNumber
      };

      this._store.dispatch(AddressBooksActions.addEntry({ entry }));

    }
  }

  public onReset(): void {
    this.form.reset();
  }
}