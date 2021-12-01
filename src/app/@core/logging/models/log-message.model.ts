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

export class LogMessage {
  constructor(
    options: Partial<LogMessage> = {},
    public source: LogMessage.Source | null = options.source || null,
    public content: string = options.content || '',
  ) {}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LogMessage {
  export enum Source {
    ADF = 'UI.ADF',
    CONSOLE = 'UI.CONSOLE',
  }
}
