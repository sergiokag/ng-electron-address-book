import { BookEntry } from 'src/app/models/book-entry';
import * as Actions from './index';

describe('Store > Actions', () => {

  it('should create a SetData action containing a payload', () => {
    const entry: BookEntry = {
      id: 1,
      firstName: 'Chester',
      lastName: 'Tester',
      phoneNumber: '1214960168'
    };
    const action = Actions.addEntry({ entry });

    expect({ ...action }).toEqual({
      type: "[Address Book] Add Entry",
      entry
    });
  });

});