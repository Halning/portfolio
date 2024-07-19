import { compareBoolean } from './sorting';

describe('#compareBoolean', () => {
  it('should compare boolean with ASC direction', () => {
    const result = compareBoolean(true, false, true);
    expect(result).toBe(-1);
  });

  it('should compare boolean with DESC direction', () => {
    const result = compareBoolean(true, false, false);
    expect(result).toBe(1);
  });
});
