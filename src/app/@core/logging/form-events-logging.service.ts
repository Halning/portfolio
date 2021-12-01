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
// import { Injectable } from '@angular/core';
// import { FormEvent, FormService, LogService } from '@alfresco/adf-core';
// import { filter } from 'rxjs/operators';
//
// @Injectable({ providedIn: 'root' })
// export class FormEventsLoggingService {
//   private readonly NAMELESS_TASK = 'Nameless task';
//
//   constructor(
//     private logService: LogService,
//     private formService: FormService,
//   ) {}
//
//   setUp(): void {
//     this.subscribeOnFormLoadedEvent();
//     this.subscribeOnFormCompletedEvent();
//   }
//
//   private subscribeOnFormCompletedEvent(): void {
//     this.formService.taskCompleted.subscribe((event: Function) => {
//       this.logService.debug(`User completed task: ${event.form.taskName}`);
//     });
//   }
//
//   private subscribeOnFormLoadedEvent(): void {
//     this.formService.formLoaded
//       .pipe(
//         filter(
//           (event: FormEvent) => event.form.taskName !== this.NAMELESS_TASK,
//         ),
//       )
//       .subscribe((event: FormEvent) => {
//         this.logService.debug(`User opened task: ${event.form.taskName}`);
//       });
//   }
// }
