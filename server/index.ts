import 'dotenv/config';

import { Server } from 'socket.io';
import express, { Express, Request, Response } from 'express';
import logger, { internalErrorLogger } from './utils/logger.ts';
import expressWinston from 'express-winston';
import http from 'http';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { authenticateClient, getPassword } from '../auth/auth.ts';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { PORT } from '@config/server.ts';
import { whitelist } from './config/index.ts';
import { signalHandler } from './utils/functions.ts';
import {
	registerPrivilegedEvents,
	registerReadEvents,
} from './socket/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express();
const server = http.createServer(app);
export const io = new Server(server, {
	cors: {
		origin: whitelist,
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	},
});

// CORS middleware
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || origin.startsWith('http://localhost')) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		methods: ['GET'],
		optionsSuccessStatus: 200,
	})
);

// Set CSP
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: [
				"'self'",
				"'unsafe-inline'",
				'https://fonts.googleapis.com',
			],
			fontSrc: ["'self'", 'https://fonts.gstatic.com'],
			connectSrc: [
				"'self'",
				'http://127.0.0.1:3001',
				'ws://127.0.0.1:3001',
			],
		},
	})
);

// HPP middleware
app.use(hpp());

// Disable X-Powered-By header
app.disable('x-powered-by');

// Static React page
app.use(express.static(path.join(__dirname, '../overlay/dist')));

/**
 * Auth middleware
 */
io.use(authenticateClient);

/**
 * Socket Event Handlers
 */
io.use(registerReadEvents);
io.use(registerPrivilegedEvents);

// Serve react app
app.get('*', (_req: Request, res: Response) => {
	const appPath = path.join(__dirname, '../overlay/dist', 'index.html');
	res.sendFile(appPath);
});

// Express routes logging
app.use(
	expressWinston.logger({
		winstonInstance: logger,
		statusLevels: true,
	})
);

// Internal application error logging
app.use(
	expressWinston.errorLogger({
		winstonInstance: internalErrorLogger,
	})
);

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);

const message = `
======================================================
============= Melee Tournament Interface =============
======================================================
🚀 Server is now running on ${chalk.blue.underline(`http://localhost:${PORT}`)}
${
	getPassword()
		? chalk.cyan('A password is required to connect from the client.')
		: chalk.red('[WARNING] A password has not been set. Use ') +
		  chalk.yellow("'npm run admin'") +
		  chalk.red(' to configure.')
}
${chalk.yellow('Press Ctrl+C to stop')}
`;

server.listen(PORT, () => {
	console.log(message);
});
