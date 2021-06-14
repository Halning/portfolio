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

import { LogApiService } from './log-api.service';
import { LogMessage } from '@core/logging/models/log-message.model';
import { HttpBpmClientService } from '@core/http/http-bpm-client.service';
import { LogInfo } from '@core/logging/models/log-info.model';
import { LogLevel } from '@core/logging/constants/log-levels.enum';
import { of } from 'rxjs';

describe('LogApiService', () => {
  let service: LogApiService;
  let httpBpmClientServiceSpy: jasmine.SpyObj<HttpBpmClientService>;

  beforeEach(() => {
    httpBpmClientServiceSpy = jasmine.createSpyObj('HttpBpmClientService', ['httpBmpClient']);
    service = new LogApiService(httpBpmClientServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#sendErrorMessage', () => {
    it('should send error to sever with error', () => {
      const mockLogMessage = new LogMessage({
        content: 'some',
        source: LogMessage.Source.ADF,
      });
      httpBpmClientServiceSpy.httpBmpClient.and.returnValue(of(null));

      service.sendErrorMessage(mockLogMessage);
      expect(httpBpmClientServiceSpy.httpBmpClient).toHaveBeenCalledWith(
        {
          path: '/api/enterprise/log/error',
          httpMethod: 'PUT',
          bodyParam: mockLogMessage,
        },
        true
      );
    });
  });

  describe('#sendDebugMessage', () => {
    it('should send error to sever with error', () => {
      const mockLogMessage = new LogMessage({
        content: 'some',
        source: LogMessage.Source.ADF,
      });
      httpBpmClientServiceSpy.httpBmpClient.and.returnValue(of(null));

      service.sendDebugMessage(mockLogMessage);
      expect(httpBpmClientServiceSpy.httpBmpClient).toHaveBeenCalledWith(
        {
          path: '/api/enterprise/log/debug',
          httpMethod: 'PUT',
          bodyParam: mockLogMessage,
        },
        true
      );
    });
  });

  describe('#getLoggerInfo', () => {
    let mockLogInfo: LogInfo;

    beforeEach(() => {
      mockLogInfo = new LogInfo({
        level: LogLevel.WARN.toString(),
      });
      httpBpmClientServiceSpy.httpBmpClient.and.returnValue(of(mockLogInfo));
    });

    it('should send request to server', () => {
      service.getLoggerInfo();
      expect(httpBpmClientServiceSpy.httpBmpClient).toHaveBeenCalledWith({
        path: '/api/enterprise/log/config',
        httpMethod: 'GET',
        returnType: LogInfo,
      });
    });

    it('should get logger info from server', (done) => {
      service.getLoggerInfo().subscribe((info: LogInfo) => {
        expect(info).toEqual(mockLogInfo);
        done();
      });
    });
  });
});
