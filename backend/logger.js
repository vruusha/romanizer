/**
 * Application Logger Configuration
 * 
 * This module configures Winston logger for the Roman Numeral Converter API.
 * It provides structured logging with timestamps and console output.
 * 
 * @version 1.0.0
 */

import { createLogger, transports, format } from 'winston';

/**
 * Winston logger instance configured for the application
 * 
 * Features:
 * - Timestamp formatting for all log entries
 * - Console transport for development and debugging
 * - Structured log format: timestamp level: message
 * 
 * Log Levels: error, warn, info, verbose, debug, silly
 */
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export default logger;


