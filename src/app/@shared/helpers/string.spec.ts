import { concatStrTemplate } from './string';

describe('#concatStrTemplate', () => {
  it('contacts string with empty and non empty values', () => {
    const field = null;
    const title = 'My favorite title';
    expect(concatStrTemplate`FIELD - ${field}TITLE - ${title}`).toEqual(
      'TITLE - My favorite title',
    );
  });
});
