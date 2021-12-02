// import { mapToArrayWithType } from '@port/my-awesome-lib';
//
// describe('#mapToArrayWithType', () => {
//   class MockModel {
//     constructor(
//       options: Partial<MockModel> = {},
//       public id: number | null = options.id || null,
//       public title: string | null = options.title || null,
//     ) {}
//   }
//
//   it('should return empty array WHEN input array is empty', () => {
//     expect(mapToArrayWithType<MockModel>(MockModel, [])).toEqual([]);
//   });
//
//   it('should return empty array WHEN input array is undefined', () => {
//     expect(mapToArrayWithType<MockModel>(MockModel, undefined)).toEqual([]);
//   });
//
//   it('should return empty array WHEN input array is null', () => {
//     expect(mapToArrayWithType<MockModel>(MockModel, null)).toEqual([]);
//   });
//
//   it('should return array with typed elements WHEN input array with elements', () => {
//     const mockInputArray = [
//       {
//         id: 1,
//         title: 'some title',
//       },
//       {
//         id: 2,
//         title: 'some title2',
//       },
//     ];
//     const expectedArray = [
//       new MockModel(mockInputArray[0]),
//       new MockModel(mockInputArray[1]),
//     ];
//     expect(mapToArrayWithType<MockModel>(MockModel, mockInputArray)).toEqual(
//       expectedArray,
//     );
//   });
// });
