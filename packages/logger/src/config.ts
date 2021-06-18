import { transports, format, LoggerOptions } from 'winston';
import { cyan, yellow, magenta } from 'chalk';

export const config: LoggerOptions = {
  level: 'silly',
  exitOnError: false,
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: () => new Date(Date.now()).toISOString() }),
    format.printf(({ level, timestamp, label, message }) => {
      const head = [
        `{${yellow(timestamp)}}`,
        level,
        `(${cyan(process.pid)})`,
        label && `[${magenta(label)}]`,
      ];

      return `${head.filter(Boolean).join(' ')}: ${message}`;
    }),
  ),
};
