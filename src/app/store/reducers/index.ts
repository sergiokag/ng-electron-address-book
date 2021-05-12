import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import * as fromAddressBook from './addressbook.reducer';

export interface AppState {
  [fromAddressBook.featureKey]: fromAddressBook.State
}

export const selectFeature = (state: AppState) => state[fromAddressBook.featureKey];

export const selectFeatureEntriesList = createSelector(
  selectFeature,
  (state: fromAddressBook.State) => state.entriesList
);

export const selectFeatureSearchTerm = createSelector(
  selectFeature,
  (state: fromAddressBook.State) => state.searchTerm
);

export const reducers: ActionReducerMap<AppState> = {
  [fromAddressBook.featureKey]: fromAddressBook.reducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
