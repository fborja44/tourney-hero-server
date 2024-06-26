import { createReducer } from '@reduxjs/toolkit';
import { OverlayData } from '@common/interfaces/Data.ts';
import {
	bracketData,
	commentatorData,
	gameplayData,
	playerCardData,
	statsData,
} from '@common/data/defaultData';
import {
	updateBracket,
	updateCommentators,
	updateGameplay,
	updatePlayer,
	updatePlayerCard,
	updateStats,
} from '../actions/dataActions.ts';

export const initialState: OverlayData = {
	gameplay: gameplayData,
	commentators: commentatorData,
	bracket: bracketData,
	playerCard: playerCardData,
	statistics: statsData,
};

const dataReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(updateGameplay, (state, action) => {
			state.gameplay = {
				...state.gameplay,
				...action.payload,
			};
		})
		.addCase(updatePlayer, (state, action) => {
			const { targetPlayer, updatedPlayer } = action.payload;
			state.gameplay[targetPlayer] = {
				...state.gameplay[targetPlayer],
				...updatedPlayer,
			};
		})
		.addCase(updateCommentators, (state, action) => {
			state.commentators = {
				...state.commentators,
				...action.payload,
			};
		})
		.addCase(updateBracket, (state, action) => {
			state.bracket = {
				...state.bracket,
				...action.payload,
			};
		})
		.addCase(updatePlayerCard, (state, action) => {
			state.playerCard = {
				...state.playerCard,
				...action.payload,
			};
		})
		.addCase(updateStats, (state, action) => {
			state.statistics = {
				...state.statistics,
				...action.payload,
			};
		});
});

export default dataReducer;
