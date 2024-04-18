import winston, { createLogger, format, transports } from 'winston';
import chalk from 'chalk';
import { Socket } from 'socket.io';
import { parseClientType, parseIp } from './parse.ts';

const formatTimestamp = winston.format.timestamp({
	format: 'YYYY-MM-DD HH:mm:ss', // Customize the timestamp format
});

const formatLevel = (level: string) => {
	switch (level) {
		case 'ERROR':
			return chalk.red(level);
		case 'WARN':
			return chalk.yellow(level);
		case 'INFO':
			return chalk.cyan(level);
		case 'VERBOSE':
			return chalk.gray(level);
		case 'DEBUG':
			return chalk.magenta(level);
		default:
			return level;
	}
};

const formatBody = (meta: any) => {
	if (meta) {
		if (meta.res.body) {
			return ` - Response Body: ${JSON.stringify(meta.res.body)}`;
		} else if (meta.req.body) {
			return ` - Request Body: ${JSON.stringify(meta.req.body)}`;
		}
	}
	return '';
};

const logFormat = format.printf(
	({ level, meta, timestamp, message, error }) => {
		// const metaString = meta ? `\n ${JSON.stringify(meta)}` : '';
		const errorStack = error ? `\n ${error}` : '';
		const response = formatBody(meta);
		const levelString = formatLevel(level.toUpperCase());
		const status = meta?.res?.statusCode
			? ` (status: ${meta.res.statusCode})`
			: '';
		return `${chalk.gray(
			`[${timestamp}]`
		)} ${levelString}: ${message}${status}${errorStack}${response}\n`;
	}
);

const fileLogFormat = format.printf(({ level, meta, timestamp, message }) => {
	const metaString = meta ? `\n ${JSON.stringify(meta)}` : '';
	const response = formatBody(meta);
	const levelString = level.toUpperCase();
	const status = meta?.res?.statusCode
		? ` (status: ${meta.res.statusCode})`
		: '';
	return `${`[${timestamp}]`} ${levelString}: ${message}${status}${metaString}${response}\n`;
});

const errorFormat = format.printf(({ level, meta, timestamp }) => {
	return `[${timestamp}] ${level.toUpperCase()}: ${meta.message}}`;
});

// Combined formatters for transports
const consoleFormatter = format.combine(
	format.errors({ stack: true }),
	format.json(),
	format.align(),
	formatTimestamp,
	logFormat
);

const fileFormatter = winston.format.combine(
	format.errors({ stack: true }),
	formatTimestamp,
	fileLogFormat
);

const logger = createLogger({
	transports: [
		new transports.Console({ format: consoleFormatter }),
		new transports.File({
			level: 'warn',
			filename: 'logs/logsWarnings.log',
			format: fileFormatter,
		}),
		new transports.File({
			level: 'error',
			filename: 'logs/logsErrors.log',
			format: fileFormatter,
		}),
	],
});

export const internalErrorLogger = createLogger({
	transports: [new transports.File({ filename: '/logs/internalErrors.log' })],
	format: format.combine(format.json(), formatTimestamp, errorFormat),
});

export const socketLog = (
	socket: Socket,
	message: string,
	error: boolean = false
) => {
	const address = parseIp(socket.handshake.address);
	const clientType = parseClientType(socket.request.headers['user-agent']);

	if (!error) {
		logger.info(`[${clientType}] ${address} ${message}`);
	} else {
		logger.error(`[${clientType}] ${address} ${message}`);
	}
};

export default logger;
