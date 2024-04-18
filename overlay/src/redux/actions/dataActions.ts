import { createAction } from '@reduxjs/toolkit';
import {
	BracketData,
	CommentatorData,
	GameplayData,
	PlayerCardData,
	PlayerData,
} from '@common/interfaces/Data.ts';

export const updateGameplay = createAction(
	'UPDATE_GAMEPLAY',
	(updatedGameplay: GameplayData) => {
		return {
			payload: updatedGameplay,
		};
	}
);

export const updatePlayer = createAction(
	'UPDATE_PLAYER',
	(targetPlayer: 'player1' | 'player2', updatedPlayer: PlayerData) => {
		return {
			payload: { targetPlayer, updatedPlayer },
		};
	}
);

export const updateCommentators = createAction(
	'UPDATE_COMMENTATORS',
	(updatedCommentators: CommentatorData) => {
		return {
			payload: updatedCommentators,
		};
	}
);

export const updateBracket = createAction(
	'UPDATE_BRACKET',
	(updatedBracket: BracketData) => {
		return {
			payload: updatedBracket,
		};
	}
);

export const updatePlayerCard = createAction(
	'UPDATE_PLAYER_CARD',
	(updatedPlayerCard: Partial<PlayerCardData>) => {
		return {
			payload: updatedPlayerCard,
		};
	}
);