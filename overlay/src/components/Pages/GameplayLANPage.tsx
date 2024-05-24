import styled from '@emotion/styled';
import OverlayContainer from '../Containers/OverlayContainer';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { GameplayData } from '@common/interfaces/Data';
import Ports from '../Ports/Ports';
import { PrimaryGradient, ItemBackground } from '@common/constants/styles';
import Fade, { FadeContainer } from '../Fade';
import {
	DEFAULT_BACKGROUND,
	THEME_PRIMARY,
	THEME_SECONDARY,
} from '@common/constants/colors';
import InfoContainer from '../Widgets/InfoContainer/InfoContainer';
import CharacterIcon from '../Character/CharacterIcon';
import { SidedElement } from '@common/interfaces/Types';
import Flag from '../Flag/Flag';

const SidebarSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: calc(12vw / 19.2);
	height: calc(1080vw / 19.2);
	width: calc(700vw / 19.2);
	padding: calc(8vw / 19.2);
	background-image: ${PrimaryGradient};
	object-fit: cover;
	background-position: left;
	background-size: calc(1920vw / 19.2) calc(1080vw / 19.2);
`;

const Video = styled.div`
	height: calc(624vw / 19.2);
	width: 100%;
	background: ${DEFAULT_BACKGROUND};
	border: calc(8vw / 19.2) solid ${THEME_PRIMARY};
	border-radius: calc(12vw / 19.2);
`;

const SidebarContent = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	border-radius: calc(20vw / 19.2);
	background: ${ItemBackground};
	padding: calc(16vw / 19.2) calc(18vw / 19.2);
`;

const SidebarInfo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const SidebarLabel = styled(InfoContainer)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: fit-content;
	padding: calc(20vw / 19.2) calc(20vw / 19.2);
	border-radius: calc(12vw / 19.2);
	font-weight: bold;
	text-transform: uppercase;
	font-size: calc(20vw / 19.2);
`;

const GameplayContainer = styled.section`
	display: flex;
	flex-direction: row;
	gap: calc(8vw / 19.2);
	align-items: center;
	padding: calc(8vw / 19.2);
	height: calc(100vw / 19.2);
	flex: 1;
	background-image: ${PrimaryGradient};
	object-fit: cover;
	background-position: top right;
	background-size: calc(1920vw / 19.2) calc(1080vw / 19.2);
	border-bottom: calc(4vw / 19.2) solid ${THEME_PRIMARY};
	text-transform: uppercase;
`;

const SideLogoImage = styled.img`
	color: white;
	width: calc(272vw / 19.2);
	height: auto;
`;

const GameplayInfoContainer = styled.section`
	display: flex;
	flex-direction: column;
	gap: calc(8vw / 19.2);
	justify-content: space-between;
	height: 100%;
	flex: 1;
`;

const LogoContainer = styled(InfoContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: calc(85vw / 19.2);
`;

const PlayerInfoTop = styled.section<SidedElement>`
	display: flex;
	flex-direction: ${(props) =>
		props.side === 'right' ? 'row-reverse' : 'row'};
	gap: calc(8vw / 19.2);
	flex: 1;
`;

const PlayerInfoContent = styled(InfoContainer)<SidedElement>`
	display: flex;
	flex-direction: ${(props) =>
		props.side === 'right' ? 'row-reverse' : 'row'};
	align-items: center;
	justify-content: space-between;
	flex: 1;
`;

const PlayerInfo = styled.div`
	display: flex;
	flex-direction: row;
	gap: calc(20vw / 19.2);
	align-items: center;
	justify-content: flex-end;
	font-weight: 800;

	.team {
		color: ${THEME_SECONDARY};
	}
`;

const PlayerTag = styled.div`
	display: flex;
	flex-direction: row;
	gap: calc(6vw / 19.2);
	align-items: center;
`;

const ScoreContainer = styled(InfoContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: calc(24vw / 19.2);
	padding: 0 calc(12vw / 19.2);
	min-width: calc(48vw / 19.2);
	height: 100%;
	width: fit-content;
	font-weight: 800;
`;

const PlayerInfoBottom = styled(InfoContainer)<SidedElement>`
	display: flex;
	flex-direction: ${(props) =>
		props.side === 'right' ? 'row-reverse' : 'row'};
	align-items: center;
	justify-content: space-between;
	font-size: calc(12vw / 19.2);
	padding: calc(5vw / 19.2) calc(18vw / 19.2);

	.info {
		display: flex;
		flex-direction: ${(props) =>
			props.side === 'right' ? 'row-reverse' : 'row'};
		align-items: center;
		gap: calc(18vw / 19.2);
	}
`;

const FlagContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LogoImage = styled.img`
	height: auto;
	width: calc(55vw / 19.2);
`;

interface GameplaySectionProps {
	gameplayData: GameplayData;
}

interface PlayerInfoSectionProps extends SidedElement {
	gameplayData: GameplayData;
}

const GameplayInfoSection = ({
	gameplayData,
	side,
}: PlayerInfoSectionProps) => {
	const { team, tag, pronoun, characterId, score, port, countryCode } =
		gameplayData[side === 'left' ? 'player1' : 'player2'];

	return (
		<GameplayInfoContainer>
			<PlayerInfoTop side={side}>
				<PlayerInfoContent side={side}>
					<FadeContainer id={`${side}-us.png`}>
						<FlagContainer>
							<Flag code={countryCode} />
						</FlagContainer>
					</FadeContainer>
					<FadeContainer id={`${side}-${team}-${tag}-${characterId}`}>
						<PlayerInfo>
							{side === 'right' && <CharacterIcon characterId={characterId} />}
							<PlayerTag>
								{team && <span className='team'>{team}</span>}
								<span>{tag}</span>
							</PlayerTag>
							{side === 'left' && <CharacterIcon characterId={characterId} />}
						</PlayerInfo>
					</FadeContainer>
				</PlayerInfoContent>
				<ScoreContainer>{score}</ScoreContainer>
			</PlayerInfoTop>
			<PlayerInfoBottom side={side}>
				<div className='info'>
					<Ports port={port} colored={false} />
					<Fade>{pronoun ?? ''}</Fade>
				</div>
				<Fade>
					{side === 'left' ? gameplayData.bracketName : gameplayData.roundName}
				</Fade>
			</PlayerInfoBottom>
		</GameplayInfoContainer>
	);
};

const SideBar = ({ gameplayData }: GameplaySectionProps) => {
	return (
		<SidebarSection>
			<Video />
			<SidebarContent>
				<SidebarInfo>
					<SideLogoImage src='/assets/logos/game-logo.png' />
				</SidebarInfo>
				<SidebarLabel>
					<Fade>{gameplayData.eventName}</Fade>
				</SidebarLabel>
			</SidebarContent>
		</SidebarSection>
	);
};

const GameplaySection = ({ gameplayData }: GameplaySectionProps) => {
	return (
		<GameplayContainer>
			<GameplayInfoSection gameplayData={gameplayData} side='left' />
			<LogoContainer>
				<LogoImage src='/assets/logos/logo.svg' alt='' />
			</LogoContainer>
			<GameplayInfoSection gameplayData={gameplayData} side='right' />
		</GameplayContainer>
	);
};

const GameplayLANPage = () => {
	const { gameplay } = useSelector((state: AppState) => state.dataState);

	return (
		<OverlayContainer>
			<SideBar gameplayData={gameplay} />
			<GameplaySection gameplayData={gameplay} />
		</OverlayContainer>
	);
};

export default GameplayLANPage;
