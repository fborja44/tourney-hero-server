import 'dotenv/config';

import { Socket, Server } from 'socket.io';
import express, { Express, Request, Response } from 'express';
import logger, { internalErrorLogger, socketLog } from './utils/logger.ts';
import expressWinston from 'express-winston';
import {
	BracketData,
	CharacterData,
	CommentatorData,
	GameplayData,
	OverlayData,
	PlayerCardData,
	ScoreData,
} from '@common/interfaces/Data.ts';
import JoiGameplay, {
	JoiCharacters,
	JoiScores,
} from '@common/validator/JoiGameplay.ts';
import http from 'http';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import JoiCommentators from '@common/validator/JoiCommentators.ts';
import JoiBracket from '@common/validator/JoiBracket.ts';
import JoiPlayerCard from '@common/validator/JoiPlayerCard.ts';
import { initialData } from '@common/data/defaultData.ts';
import {
	authenticateClient,
	getPassword,
	verifyCredentials,
} from '../auth/auth.ts';
import JoiAuth from '@common/validator/JoiAuth.ts';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { PORT } from '@config/server.ts';
import { whitelist } from './config/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
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
			styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
			fontSrc: ["'self'", 'https://fonts.gstatic.com'],
			connectSrc: ["'self'", 'http://127.0.0.1:3001', 'ws://127.0.0.1:3001'],
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
 * Default data
 */
let data: OverlayData = { ...initialData };

/**
 * Auth middleware
 */
io.use(authenticateClient);

io.on('connection', (socket: Socket) => {
	const { perm } = socket.handshake.auth;

	// Log connected client
	socketLog(
		socket,
		`Client connected: ${perm === 'READ' ? 'Read-Only' : `[id=${socket.id}]`}`
	);

	// Send data to newly connected client
	io.to(socket.id).emit('updateState', data);

	// Client events
	socket.on('disconnection', () => {
		socketLog(socket, `Client disconnected`);
	});

	// ! Privileged Data Events
	if (socket.handshake.auth.perm === 'WRITE') {
		// Data Events
		socket.on('updateGameplay', (updatedGameplay: GameplayData) => {
			// Validate data
			const result = JoiGameplay.validate(updatedGameplay);
			if (result.error) {
				socketLog(socket, `Gameplay Data Error: ${result.error.message}`, true);
				io.to(socket.id).emit('dataError', result.error.message);
				return;
			}

			data.gameplay = updatedGameplay;
			// Broadcast to all but sender
			socket.broadcast.emit('updateState', data);
			// Send success message to sender
			io.to(socket.id).emit('success', true);
			socketLog(socket, `Updated Gameplay Data`);
		});

		socket.on('updateScores', (updatedScores: ScoreData) => {
			// Validate data
			const result = JoiScores.validate(updatedScores);
			if (result.error) {
				socketLog(socket, `Scores Data Error: ${result.error.message}`, true);
				io.to(socket.id).emit('dataError', result.error.message);
				return;
			}

			// Increment scores
			data.gameplay = {
				...data.gameplay,
				player1: { ...data.gameplay.player1, score: updatedScores.p1score },
				player2: { ...data.gameplay.player2, score: updatedScores.p2score },
			};

			// Broadcast to all but sender
			socket.broadcast.emit('updateState', data);
			// Send success message to sender
			io.to(socket.id).emit('success', true);
			socketLog(socket, `Updated Scores`);
		});

		socket.on('updateCharacters', (updatedCharacters: CharacterData) => {
			// Validate data
			const result = JoiCharacters.validate(updatedCharacters);
			if (result.error) {
				socketLog(
					socket,
					`Characters Data Error: ${result.error.message}`,
					true
				);
				io.to(socket.id).emit('dataError', result.error.message);
				return;
			}

			// Update player characters
			data.gameplay = {
				...data.gameplay,
				player1: {
					...data.gameplay.player1,
					character: updatedCharacters.p1character,
				},
				player2: {
					...data.gameplay.player2,
					character: updatedCharacters.p2character,
				},
			};

			// Broadcast to all but sender
			socket.broadcast.emit('updateState', data);
			// Send success message to sender
			io.to(socket.id).emit('success', true);
			socketLog(socket, `Updated Characters`);
		});

		socket.on('updateCommentators', (updatedCommentators: CommentatorData) => {
			// Validate data
			const result = JoiCommentators.validate(updatedCommentators);
			if (result.error) {
				socketLog(
					socket,
					`Commentator Data Error: ${result.error.message}`,
					true
				);
				io.to(socket.id).emit('dataError', result.error.message);
				return;
			}

			data.commentators = updatedCommentators;
			// Broadcast to all but sender
			socket.broadcast.emit('updateState', data);
			// Send success message to sender
			io.to(socket.id).emit('success', true);
			socketLog(socket, `Updated Commentator Data`);
		});

		socket.on('updateBracket', (updatedBracket: BracketData) => {
			// Validate data
			const result = JoiBracket.validate(updatedBracket);
			if (result.error) {
				socketLog(socket, `Bracket Data Error: ${result.error.message}`, true);
				io.to(socket.id).emit('dataError', result.error.message);
				return;
			}

			data.bracket = updatedBracket;
			// Broadcast to all but sender
			socket.broadcast.emit('updateState', data);
			// Send success message to sender
			io.to(socket.id).emit('success', true);
			socketLog(socket, `Updated Bracket Data`);
		});

		socket.on('updatePlayerCard', (updatedPlayerCard: PlayerCardData) => {
			// Validate data
			const result = JoiPlayerCard.validate(updatedPlayerCard);
			if (result.error) {
				socketLog(
					socket,
					`Player Card Data Error: ${result.error.message}`,
					true
				);
				io.to(socket.id).emit('dataError', result.error.message);
				return;
			}
			data.playerCard = updatedPlayerCard;
			// Broadcast to all but sender
			socket.broadcast.emit('updateState', data);
			// Send success message to sender
			io.to(socket.id).emit('success', true);
			socketLog(socket, `Updated Player Card Data`);
		});
	}
});

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

// Signal handlers
const signalHandler = () => {
	logger.warn(`Process has been terminated. Closing server...`);
	process.exit();
};
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
		: chalk.red('[WARNING] A password has not been set.')
}
${chalk.yellow('Press Ctrl+C to stop')}
`;

server.listen(PORT, () => {
	console.log(message);
});
