import { createAction, props } from '@ngrx/store';
import { BookEntry } from '../../models/book-entry';

export const searchEntry = createAction(
  '[Address Book] Search Entry',
  props<{ searchTerm: string }>()
);

export const addEntry = createAction(
  '[Address Book] Add Entry',
  props<{ entry: BookEntry }>()
);

export const removeEntry = createAction(
  '[Address Book] Remove Entry',
  props<{ id: number }>()
);
