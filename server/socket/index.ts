import {
	BracketData,
	CharacterData,
	CommentatorData,
	Data,
	GameplayData,
	OverlayData,
	PlayerCardData,
	ScoreData,
} from '@common/interfaces/Data.ts';
import { Socket } from 'socket.io';
import { ObjectSchema } from 'joi';
import { socketLog } from '../utils/logger.ts';
import { initialData } from '@common/data/defaultData.ts';
import JoiGameplay, {
	JoiCharacters,
	JoiScores,
} from '@common/validator/JoiGameplay.ts';
import JoiCommentators from '@common/validator/JoiCommentators.ts';
import JoiBracket from '@common/validator/JoiBracket.ts';
import JoiPlayerCard from '@common/validator/JoiPlayerCard.ts';
import { io } from '../index.ts';

/**
 * In-memory data store for socket server
 * TODO: Use .json to persist server data, even after process termination
 */
export const data: OverlayData = { ...initialData };

/**
 * Middleware to log connections and register read events to connected clients
 * @param socket The connected client
 * @param next Next function
 */
export const registerReadEvents = async (socket: Socket, next: any) => {
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

	next();
};

/**
 * Middleware to register privlieged data write events to the server.
 * ! Privileged events for client UI
 * @param socket The connected client
 * @param next Next function
 */
export const registerPrivilegedEvents = async (socket: Socket, next: any) => {
	if (socket.handshake.auth.perm === 'WRITE') {
		next();
	}

	// Data Events
	socket.on('updateGameplay', (updatedGameplay: GameplayData) => {
		return updateSocketData(
			'Gameplay',
			updatedGameplay,
			() => updateGameplayData(updatedGameplay),
			JoiGameplay,
			socket
		);
	});

	socket.on('updateScores', (updatedScores: ScoreData) => {
		return updateSocketData(
			'Scores',
			updatedScores,
			() => updateScoresData(updatedScores),
			JoiScores,
			socket
		);
	});

	socket.on('updateCharacters', (updatedCharacters: CharacterData) => {
		return updateSocketData(
			'Characters',
			updatedCharacters,
			() => updateCharactersData(updatedCharacters),
			JoiCharacters,
			socket
		);
	});

	socket.on('updateCommentators', (updatedCommentators: CommentatorData) => {
		return updateSocketData(
			'Commentators',
			updatedCommentators,
			() => updateCommentatorsData(updatedCommentators),
			JoiCommentators,
			socket
		);
	});

	socket.on('updateBracket', (updatedBracket: BracketData) => {
		return updateSocketData(
			'Bracket',
			updatedBracket,
			() => updateBracketData(updatedBracket),
			JoiBracket,
			socket
		);
	});

	socket.on('updatePlayerCard', (updatedPlayerCard: PlayerCardData) => {
		return updateSocketData(
			'Player Card',
			updatedPlayerCard,
			() => updatePlayerCardData(updatedPlayerCard),
			JoiPlayerCard,
			socket
		);
	});

	next();
};

/**
 * Function to update socket data and broadcast to necessary clients.
 * @param updateFn Callback function to update in-memory overlay data
 * @param socket The socket
 * @returns True if successful. False otherwise.
 */
export const updateSocketData = (
	dataField: String,
	updateData: Data,
	updateFn: (updateData: Data) => OverlayData,
	validator: ObjectSchema,
	socket: Socket
) => {
	// Validate data
	const result = validator.validate(updateData);
	if (result.error) {
		socketLog(socket, `${dataField} Data Error: ${result.error.message}`, true);
		io.to(socket.id).emit('dataError', result.error.message);
		return false;
	}

	const newData = updateFn(updateData);
	// Broadcast to all but sender
	socket.broadcast.emit('updateState', newData);
	// Send success message to sender
	io.to(socket.id).emit('success', true);
	socketLog(socket, `Updated ${dataField} Data`);
	return true;
};

export const updateGameplayData = (
	updatedGameplay: GameplayData
): OverlayData => {
	data.gameplay = updatedGameplay;
	return data;
};

export const updateScoresData = (updatedScores: ScoreData): OverlayData => {
	// Update player scores
	data.gameplay = {
		...data.gameplay,
		player1: {
			...data.gameplay.player1,
			score: updatedScores.p1score,
		},
		player2: {
			...data.gameplay.player2,
			score: updatedScores.p2score,
		},
	};
	return data;
};

export const updateCharactersData = (
	updatedCharacters: CharacterData
): OverlayData => {
	// Update player characters
	data.gameplay = {
		...data.gameplay,
		player1: {
			...data.gameplay.player1,
			characterId: updatedCharacters.p1characterId,
		},
		player2: {
			...data.gameplay.player2,
			characterId: updatedCharacters.p2characterId,
		},
	};
	return data;
};

export const updateCommentatorsData = (
	updatedCommentators: CommentatorData
): OverlayData => {
	data.commentators = updatedCommentators;
	return data;
};

export const updateBracketData = (updatedBracket: BracketData): OverlayData => {
	data.bracket = updatedBracket;
	return data;
};

export const updatePlayerCardData = (
	updatedPlayerCard: PlayerCardData
): OverlayData => {
	data.playerCard = updatedPlayerCard;
	return data;
};
