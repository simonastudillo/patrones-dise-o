import { Logger } from 'jsr:@deno-library/logger';

// TODO: Implementar el LoggerAdapter

interface ILoggerAdapter {
   file: string;
   writeLog: (msg: string) => void;
   writeError: (msg: string) => void;
   writeWarning: (msg: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
   private logger: Logger;
   public file: string;

   constructor(
      file: string
   ) {
      this.file = file;
      this.logger = new Logger();
   }

   writeLog(msg: string): void {
      this.logger.info(`[${this.file} Log] ${msg}`);
   }

   writeError(msg: string): void {
      this.logger.error(`[${this.file} Error] ${msg}`);
   }

   writeWarning(msg: string): void {
      this.logger.warn(`[${this.file} Warning] ${msg}`);
   }

}