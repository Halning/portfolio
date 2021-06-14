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

import { Injectable } from '@angular/core';
import { HttpBpmClientService } from '@core/http/http-bpm-client.service';
import { LogInfo } from '@core/logging/models/log-info.model';
import { LogMessage } from '@core/logging/models/log-message.model';
import { noop, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogApiService {
  constructor(private httpBpmClientService: HttpBpmClientService) {}

  sendErrorMessage(logMessage: LogMessage): void {
    this.httpBpmClientService
      .httpBmpClient(
        {
          path: '/api/enterprise/log/error',
          httpMethod: 'PUT',
          bodyParam: logMessage,
        },
        true
      )
      .subscribe(noop);
  }

  sendDebugMessage(logMessage: LogMessage): void {
    this.httpBpmClientService
      .httpBmpClient(
        {
          path: '/api/enterprise/log/debug',
          httpMethod: 'PUT',
          bodyParam: logMessage,
        },
        true
      )
      .subscribe(noop);
  }

  getLoggerInfo(): Observable<LogInfo> {
    return this.httpBpmClientService.httpBmpClient<LogInfo>({
      path: '/api/enterprise/log/config',
      httpMethod: 'GET',
      returnType: LogInfo,
    });
  }
}
