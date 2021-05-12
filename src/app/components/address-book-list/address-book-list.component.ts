import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil, withLatestFrom } from "rxjs/operators";
import { BookEntry } from "src/app/models/book-entry";
import { AppState } from "src/app/store/reducers";
import * as fromRoot from "../../store/reducers"
import * as AddressBookActions from "../../store/actions";

@Component({
  selector: 'app-address-book-list',
  templateUrl: './address-book-list.component.html',
  styleUrls: ['./address-book-list.component.scss']
})
export class AddressBookListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  destroy$ = new Subject();
  entries$ = this._store.pipe(
    takeUntil(this.destroy$),
    select(fromRoot.selectFeatureEntriesList),
  );
  searchTerm$ = this._store.pipe(
    takeUntil(this.destroy$),
    select(fromRoot.selectFeatureSearchTerm),
  );

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'remove-button'];
  dataSource = new MatTableDataSource<BookEntry>([]);
  private _source = new MatTableDataSource<BookEntry>([]);

  // MatPaginator Inputs
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this.entries$
    .pipe(
      withLatestFrom(this.searchTerm$)
    )
    .subscribe( ([list, term]) => {
      this.length = list?.length;
      this.dataSource = new MatTableDataSource<BookEntry>(list.filter( obj => obj.firstName.includes(term) || obj.lastName.includes(term)));
      this._source = new MatTableDataSource<BookEntry>(list);
      this._setUpPaginationAndSorting();
    });

    this.searchTerm$
    .subscribe( (term) => {
      this.dataSource.data = this._source.data.filter( obj => obj.firstName.includes(term) || obj.lastName.includes(term));
      this.length = this.dataSource.data.length;
      this._setUpPaginationAndSorting();
    });
  }

  ngAfterViewInit(): void {
    this._setUpPaginationAndSorting();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private _setUpPaginationAndSorting(): void {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource.sort = this.sort ? this.sort : null;
  }

  public onEntryRemove(element: BookEntry): void {
    this._store.dispatch(AddressBookActions.removeEntry({ id: element.id }));
    this.length = this.dataSource.data.length;
  }
}
