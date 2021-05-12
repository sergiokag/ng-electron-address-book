import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, takeUntil } from "rxjs/operators";
import * as AddressBookActions from "../../store/actions";
import { AppState } from "src/app/store/reducers";

@Component({
  selector: 'app-search-input',
  template: `
    <div class="search-container">
      <mat-form-field class="">
        <mat-label>Search</mat-label>
        <input matInput #searchInput>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  destroy$  = new Subject();
  searchTerm$ = this._store.pipe(
    select(state => state.AddressBook.searchTerm)
  )

  constructor(private _store: Store<AppState>) {}

  ngAfterViewInit(): void {

    const searchInput$ = fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
      takeUntil(this.destroy$),
      debounceTime(400),
      map( (val: any) => val['target']['value'] ),
      distinctUntilChanged()
    );

    searchInput$.subscribe( (val: string) => {
      this._store.dispatch(AddressBookActions.searchEntry({ searchTerm: val }));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
