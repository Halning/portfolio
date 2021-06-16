/*
 * Copyright (c) 2018 CoreLogic, Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of CoreLogic, Inc.
 * It is furnished under license and may only be used or copied in accordance
 * with the terms of such license.
 * This software is subject to change without notice and no information
 * contained in it should be construed as commitment by CoreLogic, Inc.
 * CoreLogic, Inc. cannot accept any responsibility, financial or otherwise, for any
 * consequences arising from the use of this software except as otherwise stated in
 * the terms of the license.
 */

import { FormControl, FormGroup } from '@angular/forms';
import { markAsTouchedAllControls } from '@shared/utils/form.utils';

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
