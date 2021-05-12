import * as fromReducer from './addressbook.reducer';
import * as fromActions from '../actions';
import { BookEntry } from 'src/app/models/book-entry';

describe('Store > DataReducer', () => {
  afterEach(() => {
    fromReducer.initialState.entriesList = [];
  });

  it('should return default state when there is an unknown action', () => {
    const { initialState } = fromReducer;
    const action = {
      type: 'unknown'
    };
    const state = fromReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should have custom test entry in a immutable way', () => {
    const { initialState } = fromReducer;
    const entry: BookEntry = {
      id: 1,
      firstName: 'Chester',
      lastName: 'Tester',
      phoneNumber: '1214960168'
    };
    const action = fromActions.addEntry({ entry });
    const state = fromReducer.reducer(initialState, action);

    expect(state.entriesList).toEqual([ entry ]);
    expect(state.entriesList).not.toBe([ entry ]);
  });

  it('should have same state if no entry id for removal is not found', () => {
    const { initialState } = fromReducer;
    const entry: BookEntry = {
      id: 1,
      firstName: 'Chester',
      lastName: 'Tester',
      phoneNumber: '1214960168'
    };
    const addAction = fromActions.addEntry({ entry });
    const state1 = fromReducer.reducer(initialState, addAction);

    const removeAction = fromActions.removeEntry({ id: 0 });
    const state2 = fromReducer.reducer(state1, removeAction);

    expect(state1.entriesList.length).toEqual(state2.entriesList.length);
  });
});
