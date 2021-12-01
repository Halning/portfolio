import { LogLevel } from '../constants/log-levels.enum';

export class LogInfo {
  constructor(
    options: Partial<LogInfo> = {},
    public level: string = options.level ?? LogLevel?.ERROR?.toString(),
  ) {}

  // noinspection JSUnusedGlobalSymbols
  public static constructFromObject(data: Record<string, unknown>): LogInfo {
    return new LogInfo(data);
  }
}
