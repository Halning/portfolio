// /*
//  * Copyright (c) 2020 CoreLogic, Inc. All Rights Reserved.
//  *
//  * This software is the confidential and proprietary information of CoreLogic, Inc.
//  * It is furnished under license and may only be used or copied in accordance
//  * with the terms of such license.
//  * This software is subject to change without notice and no information
//  * contained in it should be construed as commitment by CoreLogic, Inc.
//  * CoreLogic, Inc. cannot accept any responsibility, financial or otherwise, for any
//  * consequences arising from the use of this software except as otherwise stated in
//  * the terms of the license.
//  */
//
// import { FormEventsLoggingService } from './form-events-logging.service';
// import { FormEvent, FormModel, FormService, LogService } from '@alfresco/adf-core';
// import { createSpyObjByConstructor } from '@testing/general.helpers';
// import { Subject } from 'rxjs';
//
// describe('FormEventsLoggingService', () => {
//   const TASK_NAME = 'Some Task';
//
//   let service: FormEventsLoggingService;
//
//   let formServiceSpy: jasmine.SpyObj<FormService>;
//   let logServiceSpy: jasmine.SpyObj<LogService>;
//
//   let taskCompletedMockSubject$: Subject<FormEvent>;
//   let formLoadedMockSubject$: Subject<FormEvent>;
//
//   let formEventMock: FormEvent;
//
//   beforeEach(() => {
//     formServiceSpy = createSpyObjByConstructor(FormService);
//     logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
//     taskCompletedMockSubject$ = new Subject<FormEvent>();
//     formLoadedMockSubject$ = new Subject<FormEvent>();
//
//     formServiceSpy.formLoaded = formLoadedMockSubject$;
//     formServiceSpy.taskCompleted = taskCompletedMockSubject$;
//
//     formEventMock = new FormEvent({
//       taskName: TASK_NAME,
//     } as FormModel);
//
//     service = new FormEventsLoggingService(logServiceSpy, formServiceSpy);
//
//     service.setUp();
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   describe('Task completion events logging', () => {
//     it('should log each event', () => {
//       taskCompletedMockSubject$.next(formEventMock);
//       taskCompletedMockSubject$.next(formEventMock);
//       expect(logServiceSpy.debug).toHaveBeenCalledTimes(2);
//     });
//
//     it('should log message with the task name', () => {
//       const expectedMessage = `User completed task: ${TASK_NAME}`;
//       taskCompletedMockSubject$.next(formEventMock);
//       expect(logServiceSpy.debug).toHaveBeenCalledWith(expectedMessage);
//       expect(logServiceSpy.debug).toHaveBeenCalledTimes(1);
//     });
//   });
//
//   describe('Task opening events logging', () => {
//     it('should log events', () => {
//       formLoadedMockSubject$.next(formEventMock);
//       formLoadedMockSubject$.next(formEventMock);
//       expect(logServiceSpy.debug).toHaveBeenCalledTimes(2);
//     });
//
//     it('should log message with the task name', () => {
//       const expectedMessage = `User opened task: ${TASK_NAME}`;
//       formLoadedMockSubject$.next(formEventMock);
//       expect(logServiceSpy.debug).toHaveBeenCalledWith(expectedMessage);
//       expect(logServiceSpy.debug).toHaveBeenCalledTimes(1);
//     });
//
//     it('should skip nameless tasks', () => {
//       (formEventMock.form as any).taskName = 'Nameless task';
//       formLoadedMockSubject$.next(formEventMock);
//       expect(logServiceSpy.debug).toHaveBeenCalledTimes(0);
//     });
//   });
// });
