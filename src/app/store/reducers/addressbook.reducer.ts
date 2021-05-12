import { BookEntry } from "src/app/models/book-entry";
import { Action, createReducer, on } from "@ngrx/store";
import * as AddressBookActions from '../actions';

export const featureKey = 'AddressBook';

export interface State {
  searchTerm: string,
  entriesList: BookEntry[]
}

export const initialState: State = {
  searchTerm: '',
  entriesList: []
};

const addressBookReducer = createReducer(
  initialState,
  on(AddressBookActions.searchEntry, (state, { searchTerm }) => {
    return ({ ...state, searchTerm })
  }),
  on(AddressBookActions.addEntry, (state, { entry }) => {
    return ({ ...state, entriesList: [ entry, ...state.entriesList ] })
  }),
  on(AddressBookActions.removeEntry, (state, { id }) => {
    return ({ ...state, entriesList: state.entriesList.filter(entry => entry.id !== id) })
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return addressBookReducer(state, action);
}