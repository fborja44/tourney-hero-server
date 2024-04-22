export interface User {
	username: string;
	hashedPassword: string;
}

export type Port = 'Red' | 'Blue' | 'Yellow' | 'Green' | 'None';

export type Character =
	| 'Bowser'
	| 'CaptainFalcon'
	| 'DonkeyKong'
	| 'DrMario'
	| 'Falco'
	| 'Fox'
	| 'Ganondorf'
	| 'IceClimbers'
	| 'Jigglypuff'
	| 'Kirby'
	| 'Link'
	| 'Luigi'
	| 'Mario'
	| 'Marth'
	| 'Mewtwo'
	| 'MrGameWatch'
	| 'Ness'
	| 'Peach'
	| 'Pichu'
	| 'Pikachu'
	| 'Roy'
	| 'Samus'
	| 'Sheik'
	| 'Yoshi'
	| 'YoungLink'
	| 'Zelda'
	| 'Default';

export interface Tournament {
	name: string;
	eventName: string;
	imageUrl: string;
}

export interface Match {
	id: string;
	identifier: string;
	hasPlaceholder: string;
	round: number;
	roundName: string;
	bracket: {
		name: string;
		bestOf: number;
	};
	player1: Player;
	player2: Player;
}

export interface Player {
	id: string;
	tag: string;
	team: string;
	pronoun: string;
	imageUrl: string | null;
	score: number | null;
	isWinner: boolean;
}

export interface PlayerCardMatch {
	player1Tag: string;
	player1Score: number;
	player2Tag: string;
	player2Score: number;
	roundName: string;
}

export interface PlayerCardPlacement {
	placement: number;
	iconSrc: string;
	name: string;
}

export interface InputValidation {
	status: 'error' | 'none' | 'success' | 'warning' | undefined;
	message: string | undefined;
}

export interface PlayerProfile {
	id: string; // startgg id
	tag: string;
	seed: number;
	team: string;
	mains: Character[];
	secondaries: Character[];
	location: string;
	pronouns?: string;
	twitter?: string;
	twitch?: string;
}

export interface SidedElement {
	side: 'left' | 'right';
}
