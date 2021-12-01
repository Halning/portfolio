// import { Injectable } from '@angular/core';
// import { LogService } from '@alfresco/adf-core';
// import { LogApiService } from '@core/logging/log-api.service';
// import { LogLevel } from '@core/logging/constants/log-levels.enum';
// import { LogInfo } from '@core/logging/models/log-info.model';
// import { LogMessage } from '@core/logging/models/log-message.model';
// import { CareAuthenticationService } from '@core/auth/care-authentication.service';
// import { first } from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class CareLogService {
//   logLevel: LogLevel;
//   readonly ADF_MARKER = 'adf-marker';
//
//   constructor(
//     private logService: LogService,
//     private logApiService: LogApiService,
//     private careAuthenticationService: CareAuthenticationService,
//   ) {}
//
//   setUp(): void {
//     this.careAuthenticationService.onUserProfileState$
//       .pipe(first())
//       .subscribe(() => {
//         this.subscribeOnConsoleError();
//         this.subscribeOnAlfrescoMessages();
//         this.subscribeOnDebugMessages();
//         this.loadAndSetupLogLevel();
//       });
//   }
//
//   private subscribeOnConsoleError(): void {
//     const originalErrorOutput = console.error.bind(console);
//     console.error = (...args: any[]) => {
//       if (this.isThereAdfMarker(args)) {
//         this.trimAdfMarker(args);
//         this.sendErrorMessage(LogMessage.Source.ADF, args);
//       } else {
//         this.sendErrorMessage(LogMessage.Source.CONSOLE, args);
//       }
//       originalErrorOutput(...args);
//     };
//   }
//
//   private subscribeOnAlfrescoMessages(): void {
//     const originalErrorHandler = this.logService.error.bind(this.logService);
//     this.logService.error = (message?: string, ...optionalParams: any[]) => {
//       optionalParams[optionalParams.length] = this.ADF_MARKER;
//       originalErrorHandler(message, ...optionalParams);
//     };
//   }
//
//   private subscribeOnDebugMessages(): void {
//     const originalDebugHandler = this.logService.debug.bind(this.logService);
//     this.logService.debug = (message?: any, ...optionalParams: any[]) => {
//       this.sendDebugMessage(message, optionalParams);
//       originalDebugHandler(message, optionalParams);
//     };
//   }
//
//   private isThereAdfMarker(args: any[]): boolean {
//     return args[args.length - 1] === this.ADF_MARKER;
//   }
//
//   private trimAdfMarker(args: any[]): void {
//     args.pop();
//   }
//
//   private sendErrorMessage(source: LogMessage.Source, args: any[]): void {
//     if (this.logLevel >= LogLevel.ERROR) {
//       const content = args.join(',');
//       this.logApiService.sendErrorMessage(new LogMessage({ source, content }));
//     }
//   }
//
//   private sendDebugMessage(message: string, optionalParams: any[]): void {
//     if (this.logLevel >= LogLevel.DEBUG) {
//       const source = LogMessage.Source.ADF;
//       const content = this.appendParametersAsStringIfPresent(
//         message,
//         optionalParams,
//       );
//       this.logApiService.sendDebugMessage(new LogMessage({ source, content }));
//     }
//   }
//
//   private loadAndSetupLogLevel(): void {
//     this.logApiService.getLoggerInfo().subscribe((info: LogInfo) => {
//       this.logLevel = LogLevel[info.level];
//     });
//   }
//
//   private appendParametersAsStringIfPresent(
//     content: string,
//     optionalParams: any[],
//   ): string {
//     if (optionalParams.length) {
//       return `${content}. ${optionalParams
//         .map((param) => JSON.stringify(param))
//         .join(', ')}`;
//     }
//     return content;
//   }
// }
