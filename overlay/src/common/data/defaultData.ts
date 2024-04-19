import {
	BracketData,
	BracketMatch,
	CommentatorData,
	GameplayData,
	OverlayData,
	PlayerCardData,
} from '../interfaces/Data.ts';

export const gameplayData: GameplayData = {
	matchType: 'Best of 3',
	roundName: 'Winners Round 1',
	bracketName: 'Main Bracket',
	eventName: 'Melee Singles',
	infoMsg: 'start.gg/short-slug',
	showCommentators: false,
	player1: {
		tag: 'Player 1',
		tagDisplaySize: 32,
		score: 0,
		character: 'Default',
		team: '',
		port: 'Red',
		pronoun: '',
	},
	player2: {
		tag: 'Player 2',
		tagDisplaySize: 32,
		score: 0,
		character: 'Default',
		team: '',
		port: 'Blue',
		pronoun: '',
	},
	showPlayerCamInfo: true,
};

export const commentatorData: CommentatorData = {
	commentator1: '',
	social1: '',
	commentator2: '',
	social2: '',
	commentator3: '',
	social3: '',
	showCommentators: true,
	message: 'Welcome!',
	player1tag: '',
	player2tag: '',
	showMessage: true,
	showMatch: false,
	timerMinutes: 5,
	showTimer: false,
	eventTime: 'Next',
	eventName: 'Welcome To',
	day: 0,
	showEvent: true,
	showAds: false,
};

const matchData: BracketMatch = {
	p1tag: '',
	p2tag: '',
	p1score: 0,
	p2score: 0,
	completed: false,
	started: false,
};

export const bracketData: BracketData = {
	lr1Top: matchData,
	lr1Bottom: matchData,
	wsfTop: matchData,
	wsfBottom: matchData,
	lqfTop: matchData,
	lqfBottom: matchData,
	wf: matchData,
	lf: matchData,
	lsf: matchData,
	gf: matchData,
	gfReset: matchData,
};

export const playerCardData: PlayerCardData = {
	showTeamLogo: true,
	character: 'Default',
	player: {
		tag: 'Player 1',
		team: '',
		pronoun: '',
		twitter: '',
		twitch: '',
		seed: 0,
		matches: [],
		placements: [],
		id: 0,
		country: '',
		state: '',
	},
};

export const initialData: OverlayData = {
	gameplay: gameplayData,
	commentators: commentatorData,
	bracket: bracketData,
	playerCard: playerCardData,
};
