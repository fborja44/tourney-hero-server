import { Character, EntrantPlayerData, Port } from './Types.ts';

export type Data =
	| GameplayData
	| CommentatorData
	| BracketData
	| PlayerCardData
	| ScoreData
	| CharacterData;

export interface OverlayData {
	gameplay: GameplayData;
	commentators: CommentatorData;
	bracket: BracketData;
	playerCard: PlayerCardData;
}

export type AutomationData = ScoreData | CharacterData;

export interface GameplayData {
	matchType: string;
	roundName: string;
	bracketName: string;
	eventName: string;
	showCommentators: boolean;
	infoMsg: string;
	player1: PlayerData;
	player2: PlayerData;
	showPlayerCamInfo: boolean;
}

export interface ScoreData {
	p1score: number | null;
	p2score: number | null;
}

export interface CharacterData {
	p1character: Character;
	p2character: Character;
}

export interface PlayerData {
	tag: string;
	tagDisplaySize: number;
	score: number | null;
	character: Character;
	team: string;
	pronoun: string | null;
	port: Port;
}

export interface CommentatorData {
	commentator1: string;
	social1: string;
	commentator2: string;
	social2: string;
	commentator3: string;
	social3: string;
	showCommentators: boolean;
	message: string;
	showMessage: boolean;
	player1tag: string;
	player2tag: string;
	showMatch: boolean;
	timerMinutes: number;
	showTimer: boolean;
	eventTime: 'Next' | 'Now';
	eventName: string;
	day: number;
	showEvent: boolean;
	showAds: boolean;
}

export interface BracketMatch {
	p1tag: string;
	p2tag: string;
	p1score: number;
	p2score: number;
	completed: boolean;
	started: boolean;
}

export interface BracketData {
	lr1Top: BracketMatch;
	lr1Bottom: BracketMatch;
	wsfTop: BracketMatch;
	wsfBottom: BracketMatch;
	lqfTop: BracketMatch;
	lqfBottom: BracketMatch;
	wf: BracketMatch;
	lsf: BracketMatch;
	lf: BracketMatch;
	gf: BracketMatch;
	gfReset: BracketMatch;
}

export interface PlayerCardData {
	showTeamLogo: boolean;
	player: EntrantPlayerData;
}
