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

import { mapToArrayWithType } from '@shared/utils/mapping-model.utils';

describe('#mapToArrayWithType', () => {
  class MockModel {
    constructor(
      options: Partial<MockModel> = {},
      public id: number = options.id || null,
      public title: string = options.title || null
    ) {}
  }

  it('should return empty array WHEN input array is empty', () => {
    expect(mapToArrayWithType<MockModel>(MockModel, [])).toEqual([]);
  });

  it('should return empty array WHEN input array is undefined', () => {
    expect(mapToArrayWithType<MockModel>(MockModel, undefined)).toEqual([]);
  });

  it('should return empty array WHEN input array is null', () => {
    expect(mapToArrayWithType<MockModel>(MockModel, null)).toEqual([]);
  });

  it('should return array with typed elements WHEN input array with elements', () => {
    const mockInputArray = [
      {
        id: 1,
        title: 'some title',
      },
      {
        id: 2,
        title: 'some title2',
      },
    ];
    const expectedArray = [new MockModel(mockInputArray[0]), new MockModel(mockInputArray[1])];
    expect(mapToArrayWithType<MockModel>(MockModel, mockInputArray)).toEqual(expectedArray);
  });
});
