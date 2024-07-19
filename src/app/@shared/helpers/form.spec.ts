import { FormControl, FormGroup } from '@angular/forms';
import { markAsTouchedAllControls } from './form';

describe('#markAsTouchedAllControls', () => {
  const controlMock1 = new FormControl('');
  const controlMock2 = new FormControl('');
  const controlMock3 = new FormControl('');
  const nestedFormGroupMock = new FormGroup({
    controlMock3,
  });
  const mockForm = new FormGroup({
    controlMock1,
    controlMock2,
    nestedFormGroupMock,
  });

  beforeEach(() => {
    markAsTouchedAllControls(mockForm);
  });

  it('should return empty array WHEN input array is empty', () => {
    expect(controlMock1.touched).toBe(true);
    expect(controlMock2.touched).toBe(true);
  });

  it('should return empty array WHEN input array is empty', () => {
    expect(controlMock3.touched).toBe(true);
  });
});
