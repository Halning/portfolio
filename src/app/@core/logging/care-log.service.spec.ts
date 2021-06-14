import { CareLogService } from './care-log.service';
import { LogService } from '@alfresco/adf-core';
import { LogApiService } from '@core/logging/log-api.service';
import { LogInfo } from '@core/logging/models/log-info.model';
import { LogLevel } from '@core/logging/constants/log-levels.enum';
import { LogMessage } from '@core/logging/models/log-message.model';
import { CareAuthenticationService } from '@core/auth/care-authentication.service';
import { BpmUser } from '@core/auth/models/bpm-user.model';
import { createSpyObjByConstructor } from '@testing/general.helpers';
import { of, Subject } from 'rxjs';

describe('CareLogService', () => {
  let service: CareLogService;
  let logServiceSpy: jasmine.SpyObj<LogService>;
  let logApiServiceSpy: jasmine.SpyObj<LogApiService>;
  let loggerInfoSubject$: Subject<LogInfo>;
  let careAuthenticationServiceStub: CareAuthenticationService;

  beforeEach(() => {
    logServiceSpy = createSpyObjByConstructor(LogService);
    logApiServiceSpy = createSpyObjByConstructor(LogApiService);
    loggerInfoSubject$ = new Subject<LogInfo>();
    logApiServiceSpy.getLoggerInfo.and.returnValue(loggerInfoSubject$);

    careAuthenticationServiceStub = {
      onUserProfileState$: of(new BpmUser()),
    } as CareAuthenticationService;

    service = new CareLogService(logServiceSpy, logApiServiceSpy, careAuthenticationServiceStub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setUp', () => {
    describe('#loadAndSetupLogLevel', () => {
      beforeEach(() => {
        service.setUp();
      });

      it('should load logger info', () => {
        expect(logApiServiceSpy.getLoggerInfo).toHaveBeenCalled();
      });

      it('should save log level', () => {
        const responseMock = new LogInfo({
          level: 'INFO',
        });
        loggerInfoSubject$.next(responseMock);
        expect(service.logLevel).toBe(LogLevel.INFO);
      });

      it('should not perform initialization logger in case of was it done before', () => {
        expect(logApiServiceSpy.getLoggerInfo).toHaveBeenCalledTimes(1);
      });
    });

    describe('#subscribeOnConsoleError', () => {
      let consoleErrorSpy: jasmine.Spy;

      beforeEach(() => {
        consoleErrorSpy = spyOn(console, 'error');
      });

      describe('WHEN there is error from ADF', () => {
        describe('AND log level equals or greater than ERROR', () => {
          beforeEach(() => {
            service.logLevel = LogLevel.WARN;
            service.setUp();
            console.error('some content');
          });

          it('should send error message to server', () => {
            expect(logApiServiceSpy.sendErrorMessage).toHaveBeenCalledWith(
              new LogMessage({
                source: LogMessage.Source.CONSOLE,
                content: 'some content',
              })
            );
          });
        });

        describe('AND log level lower than ERROR', () => {
          beforeEach(() => {
            service.logLevel = LogLevel.SILENT;
          });

          it('should not send error message to server', () => {
            service.setUp();
            console.error('some content');
            expect(logApiServiceSpy.sendErrorMessage).not.toHaveBeenCalledWith(
              new LogMessage({
                source: LogMessage.Source.CONSOLE,
                content: 'some content',
              })
            );
          });
        });

        it('should delegate to original console without adf marker', () => {
          service.setUp();
          console.error('LOG MESSAGE', service.ADF_MARKER);
          expect(consoleErrorSpy).toHaveBeenCalledWith('LOG MESSAGE');
        });
      });

      describe('WHEN there is error not from ADF', () => {
        describe('AND log level equals or greater than ERROR', () => {
          beforeEach(() => {
            service.logLevel = LogLevel.WARN;
            service.setUp();
            console.error('some content');
          });

          it('should send error message to server', () => {
            expect(logApiServiceSpy.sendErrorMessage).toHaveBeenCalledWith(
              new LogMessage({
                source: LogMessage.Source.CONSOLE,
                content: 'some content',
              })
            );
          });
        });

        describe('AND log level lower than ERROR', () => {
          beforeEach(() => {
            service.logLevel = LogLevel.SILENT;
          });

          it('should not send error message to server', () => {
            service.setUp();
            console.error('some content');
            expect(logApiServiceSpy.sendErrorMessage).not.toHaveBeenCalled();
          });
        });

        it('should delegate to original console without any changing', () => {
          service.setUp();
          console.error('message');
          expect(consoleErrorSpy).toHaveBeenCalledWith('message');
        });
      });
    });

    describe('#subscribeOnAlfrescoErrorMessages', () => {
      describe('WHEN there is ADF error', () => {
        let logServiceErrorSpy: jasmine.Spy;

        beforeEach(() => {
          logServiceErrorSpy = logServiceSpy.error; // save because SUT will redefine this method
        });

        describe('AND error is simple message', () => {
          beforeEach(() => {
            service.setUp();
            (service as any).logService.error('some content error');
          });

          it('should delegate error with adf marker to original console', () => {
            expect(logServiceErrorSpy).toHaveBeenCalledWith('some content error', service.ADF_MARKER);
          });
        });

        describe('AND error is simple message with additional params', () => {
          beforeEach(() => {
            service.setUp();
            (service as any).logService.error('some content error', 'V', 'K');
          });

          it('should delegate error with adf marker and additional params to original console', () => {
            expect(logServiceErrorSpy).toHaveBeenCalledWith('some content error', 'V', 'K', service.ADF_MARKER);
          });
        });
      });
    });

    describe('#subscribeOnDebugMessages', () => {
      beforeEach(() => {
        service.setUp();
        spyOn(logServiceSpy, 'debug').and.callThrough();
      });

      describe('WHEN log level is less then DEBUG', () => {
        it('should not send message', () => {
          service.logLevel = LogLevel.ERROR;
          logServiceSpy.debug('Any content');
          expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledTimes(0);
        });
      });

      describe('WHEN log level is at least DEBUG', () => {
        beforeEach(() => {
          service.logLevel = LogLevel.DEBUG;
        });

        it('should send message', () => {
          logServiceSpy.debug();
          expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledTimes(1);
        });

        it('should send message behalf on ADF', () => {
          const expectedLogMessage = new LogMessage({ source: LogMessage.Source.ADF });
          logServiceSpy.debug();
          expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledWith(expectedLogMessage);
          expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledTimes(1);
        });

        it('should send message with given string as content', () => {
          const expectedLogMessage = new LogMessage({ content: 'String content', source: LogMessage.Source.ADF });
          logServiceSpy.debug('String content');
          expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledWith(expectedLogMessage);
          expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledTimes(1);
        });

        describe('AND parameters are present', () => {
          it('should append them as a string to the message', () => {
            const expectedContent = 'Some primary debug message. {"someKey":"some value"}';
            const expectedLogMessage = new LogMessage({ source: LogMessage.Source.ADF, content: expectedContent });
            logServiceSpy.debug('Some primary debug message', { someKey: 'some value' });
            expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledWith(expectedLogMessage);
            expect(logApiServiceSpy.sendDebugMessage).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});
