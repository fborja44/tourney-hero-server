import styled from '@emotion/styled';
import OverlayContainer from '../Containers/OverlayContainer';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import {
	CommentatorData,
	GameplayData,
	PlayerData,
} from '@common/interfaces/Data';
import Ports from '../Ports/Ports';
import {
	PrimaryGradient,
	ItemBackground,
	Port1Background,
	Port2Background,
	Port3Background,
	Port4Background,
	DropShadow,
} from '@common/constants/styles';
import Mic from '../../assets/icons/mic.svg';
import Fade, { FadeContainer, Hide } from '../Fade';
import { THEME_SECONDARY } from '@common/constants/colors';
import InfoContainer from '../Widgets/InfoContainer/InfoContainer';
import { SidedElement } from '@common/interfaces/Types';

interface CharacterContainerProps {
	background: string;
}

const SidebarSection = styled.section<SidedElement>`
	display: flex;
	flex-direction: column;
	height: calc(1080vw / 19.2);
	width: calc(303vw / 19.2);
	background-image: ${PrimaryGradient};
	object-fit: cover;
	background-position: ${(props) => props.side};
	background-size: calc(1920vw / 19.2) calc(1080vw / 19.2);
`;

const GameplayContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: calc(12vw / 19.2);
	flex: 1;
`;

const SideContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const PlayerContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: calc(10vw / 19.2);
	padding: calc(12vw / 19.2);
	flex: 1;
`;

const SidebarFooter = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: calc(75vw / 19.2);
	width: 100%;
	background: ${ItemBackground};
	border-radius: calc(12vw / 19.2) calc(12vw / 19.2) 0px 0px;
	text-transform: uppercase;
	font-weight: bold;
	font-size: calc(16vw / 19.2);
	box-shadow: ${DropShadow};
`;

const PlayerInfoTop = styled(InfoContainer)<SidedElement>`
	display: flex;
	flex-direction: ${(props) =>
		props.side === 'right' ? 'row-reverse' : 'row'};
	align-items: center;
	height: calc(42vw / 19.2);
	justify-content: space-between;
	text-transform: uppercase;
	font-weight: 700;
`;

const InfoSection = styled.div<SidedElement>`
	display: flex;
	align-items: center;
	flex-direction: ${(props) =>
		props.side === 'right' ? 'row-reverse' : 'row'};
	height: 100%;
	gap: calc(14vw / 19.2);
	font-size: calc(12vw / 19.2);
	justify-content: ${(props) =>
		props.side === 'right' ? 'flex-end' : 'flex-start'};
`;

const CharacterContainer = styled.div<CharacterContainerProps>`
	background: ${(props) => props.background};
	height: calc(528vw / 19.2);
	border-radius: calc(15vw / 19.2);
	position: relative;
	box-shadow: ${DropShadow};
`;

const CharacterImage = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: top;
	top: 0;
	left: 0;
	z-index: 5;
	border-radius: calc(15vw / 19.2);
`;

const ScoreContainer = styled.div<SidedElement>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	${(props) => `${props.side === 'right' ? 'left' : 'right'}: 0;`}
	bottom: 0;
	border-radius: ${(props) =>
		props.side === 'right' ? '0 calc(15vw / 19.2)' : 'calc(15vw / 19.2) 0'};
	background: rgba(0, 0, 0, 0.7);
	font-weight: 800;
	font-size: calc(64vw / 19.2);
	line-height: calc(60vw / 19.2);
	padding: calc(20vw / 19.2);
	min-width: calc(90vw / 19.2);
	min-height: calc(105vw / 19.2);
	z-index: 10;
`;

const PlayerInfoBottom = styled(InfoContainer)`
	font-weight: bold;
	width: 100%;
	text-transform: uppercase;
	font-size: calc(26vw / 19.2);
`;

const PlayerInfoBottomContent = styled.div`
	display: flex;
	gap: calc(8vw / 19.2);
	justify-content: center;

	.team {
		font-weight: 800;
		color: ${THEME_SECONDARY};
	}
`;

const GameplayInfo = styled.div`
	padding: calc(8vw / 19.2) calc(18vw / 19.2);
	width: 50%;
	text-align: center;
	font-weight: bold;
	font-size: calc(20vw / 19.2);
	background: rgba(0, 0, 0, 0.8);
	object-fit: cover;
	background-position: center;
	background-size: 100% auto;

	border-radius: calc(10vw / 19.2);
	text-transform: uppercase;
`;

const FlagImage = styled.img`
	height: calc(20vw / 19.2);
	width: auto;
`;

const LeftContentContainer = styled(SideContentContainer)`
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const LogoImage = styled.img`
	color: white;
	width: calc(232vw / 19.2);
	height: auto;
`;

const RightContentContainer = styled(SideContentContainer)`
	align-items: center;
	padding: calc(20vw / 19.2) 0;
	gap: calc(16vw / 19.2);
`;

const CommentatorContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background: ${ItemBackground};
	padding: calc(8vw / 19.2) calc(16vw / 19.2);
	gap: calc(14vw / 19.2);
	width: 80%;
	font-size: calc(15vw / 19.2);
	font-weight: 500;
	border-radius: calc(20vw / 19.2);

	img {
		height: calc(18vw / 19.2);
		width: auto;
	}
`;

interface GameplaySectionProps {
	gameplayData: GameplayData;
}

interface RightSectionProps extends GameplaySectionProps {
	commentatorData: CommentatorData;
}

interface PlayerInfoSectionProps {
	playerData: PlayerData;
	side: 'left' | 'right';
}

const PlayerInfoSection = ({ playerData, side }: PlayerInfoSectionProps) => {
	const getPortBackground = () => {
		switch (playerData.port) {
			case 'Red':
				return Port1Background;
			case 'Blue':
				return Port2Background;
			case 'Yellow':
				return Port3Background;
			case 'Green':
				return Port4Background;
			default:
				return ItemBackground;
		}
	};

	return (
		<PlayerContent>
			<PlayerInfoTop side={side}>
				<FadeContainer id={`${side}-${playerData.pronoun}-us.png`}>
					<InfoSection side={side}>
						<FlagImage src={`/assets/flags/${encodeURIComponent('us.png')}`} />
						{playerData.pronoun && <span>{playerData.pronoun}</span>}
					</InfoSection>
				</FadeContainer>
				<Ports port={playerData.port} colored={false} />
			</PlayerInfoTop>
			<CharacterContainer background={getPortBackground()}>
				<FadeContainer id={`${side}-${playerData.character}`}>
					<CharacterImage
						src={`/assets/portraits/${side}/${encodeURIComponent(
							playerData.character
						)}.png`}
						alt=''
					/>
				</FadeContainer>
				<ScoreContainer side={side}>
					<Fade>{playerData.score ?? ''}</Fade>
				</ScoreContainer>
			</CharacterContainer>
			<PlayerInfoBottom>
				<FadeContainer
					style={{ width: '100%' }}
					id={`${side}-${playerData.team}-${playerData.tag}`}
				>
					<PlayerInfoBottomContent>
						<span className='team'>{playerData.team}</span>
						<span>{playerData.tag}</span>
					</PlayerInfoBottomContent>
				</FadeContainer>
			</PlayerInfoBottom>
		</PlayerContent>
	);
};

const LeftSection = ({ gameplayData }: GameplaySectionProps) => {
	return (
		<SidebarSection side={'left'}>
			<PlayerInfoSection side='left' playerData={gameplayData.player1} />
			<LeftContentContainer>
				<LogoImage src='/assets/logos/game-logo.png' />
			</LeftContentContainer>
			<SidebarFooter>
				{gameplayData.bracketName} - {gameplayData.matchType}
			</SidebarFooter>
		</SidebarSection>
	);
};

const GameplaySection = ({ gameplayData }: GameplaySectionProps) => {
	return (
		<GameplayContainer>
			<GameplayInfo>
				<Fade>{gameplayData.roundName}</Fade>
			</GameplayInfo>
		</GameplayContainer>
	);
};

interface CommentatorProps {
	name: string;
}

const Commentator = ({ name }: CommentatorProps) => {
	return (
		<Hide
			show={name.trim() !== ''}
			style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
		>
			<CommentatorContainer>
				<img src={Mic} alt='' />
				<span>
					<Fade>{name}</Fade>
				</span>
			</CommentatorContainer>
		</Hide>
	);
};

const RightSection = ({ gameplayData, commentatorData }: RightSectionProps) => {
	return (
		<SidebarSection side='right'>
			<PlayerInfoSection side='right' playerData={gameplayData.player2} />
			<Hide
				show={gameplayData.showCommentators}
				style={{ width: '100%', flex: 1 }}
			>
				<RightContentContainer>
					<Commentator name={commentatorData.commentator1} />
					<Commentator name={commentatorData.commentator2} />
					<Commentator name={commentatorData.commentator3} />
				</RightContentContainer>
			</Hide>
			<SidebarFooter>
				<Fade>{gameplayData.infoMsg}</Fade>
			</SidebarFooter>
		</SidebarSection>
	);
};

const GameplayPage = () => {
	const { gameplay, commentators } = useSelector(
		(state: AppState) => state.dataState
	);

	return (
		<OverlayContainer>
			<LeftSection gameplayData={gameplay} />
			<GameplaySection gameplayData={gameplay} />
			<RightSection gameplayData={gameplay} commentatorData={commentators} />
		</OverlayContainer>
	);
};

export default GameplayPage;
