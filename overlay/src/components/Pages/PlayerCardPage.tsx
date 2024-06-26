import styled from '@emotion/styled';
import OverlayContainer from '../Containers/OverlayContainer';
import InfoContainer from '../Widgets/InfoContainer/InfoContainer';
import { PrimaryGradient } from '@common/constants/styles';
import { THEME_PRIMARY, THEME_SECONDARY } from '@common/constants/colors';
import Ticker from '../Widgets/Ticker/Ticker';
import { SiTwitch, SiTwitter } from 'react-icons/si';
import {
	CharacterId,
	PlayerCardMatch,
	PlayerCardPlacement,
} from '@common/interfaces/Types';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { getNumberSuffix, trimNamePrefix } from '../../utils/string';
import Fade, { FadeContainer } from '../Fade';
import Flag from '../Flag/Flag';
import { getCountryAlias } from '../../utils/location';
import CharacterPortrait from '../Character/CharacterPortrait';

const PlayerCardContainer = styled(OverlayContainer)`
	flex-direction: column;
	overflow: hidden;
	text-transform: uppercase;
	background: ${PrimaryGradient};
	background-size: calc(1920vw / 19.2) calc(1080vw / 19.2);
	background-position: left;
	font-family: Oswald;
`;

const PageContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex: 1;
	padding: calc(32vw / 19.2);
	gap: calc(24vw / 19.2);
`;

const SectionContainer = styled.section`
	display: flex;
	flex-direction: column;
	gap: calc(24vw / 19.2);
	width: calc(264vw / 19.2);
	height: 100%;
`;

const SeedContainer = styled(InfoContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: calc(18vw / 19.2);
	padding: calc(48vw / 19.2) 0;
	border-radius: calc(15vw / 19.2);

	.title {
		font-size: calc(40vw / 19.2);
		font-weight: 300;
	}

	.seed {
		font-size: calc(154vw / 19.2);
		line-height: calc(164vw / 19.2);
	}
`;

const CharacterContainer = styled(InfoContainer)`
	border-radius: calc(15vw / 19.2);
	flex: 1;
	position: relative;

	.label {
		position: absolute;
		left: 50%;
		top: calc(64vw / 19.2);
		transform: translate(-50%, -50%);
		font-size: calc(40vw / 19.2);
		font-weight: 300;
		z-index: 5;
	}
`;

const MainContainer = styled(InfoContainer)`
	position: relative;
	flex-direction: column;
	border-radius: calc(20vw / 19.2);
	padding: calc(54vw / 19.2) calc(64vw / 19.2);
	gap: calc(28vw / 19.2);
	flex: 1;
`;

const Footer = styled(InfoContainer)`
	flex-direction: row;
	height: calc(82vw / 19.2);
	border-radius: calc(15vw / 19.2);
	padding: calc(22vw / 19.2) calc(64vw / 19.2);
`;

const TeamLogo = styled.img`
	position: absolute;
	width: calc(800vw / 19.2);
	height: auto;
	right: calc(96vw / 19.2);
	top: calc(64vw / 19.2);
	opacity: 0.15;
`;

const MainHeader = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	z-index: 1;
`;

const LocationContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: calc(32vw / 19.2);
	font-weight: 400;
	font-size: calc(32vw / 19.2);
`;

const TagContainer = styled.div`
	font-size: calc(112vw / 19.2);

	.team {
		font-weight: 300;
	}

	.tag {
		font-weight: 800;
		color: ${THEME_SECONDARY};
	}
`;

const SocialsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: calc(36vw / 19.2);
	font-size: calc(32vw / 19.2);
	font-weight: 300;

	.social {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: calc(16vw / 19.2);

		.icon {
			color: ${THEME_SECONDARY};
		}
	}
`;

const MainContent = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	gap: calc(72vw / 19.2);
	flex: 1;
	z-index: 1;
`;

const DataSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: calc(8vw / 19.2);
	flex: 1;
`;

const DataList = styled.div`
	display: flex;
	flex-direction: column;
	gap: calc(16vw / 19.2);
	flex: 1;
`;

const SectionHeader = styled.div`
	color: ${THEME_SECONDARY};
	font-size: calc(36vw / 19.2);
	margin-bottom: calc(12vw / 19.2);
	font-weight: 500;
`;

const Divider = styled.span`
	width: 100%;
	height: calc(1vw / 19.2);
	background: ${THEME_PRIMARY};
	opacity: 0.3;
`;

const DataBackground = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: calc(32vw / 19.2);

	background: rgba(0, 0, 0, 0.3);
	border-radius: calc(15vw / 19.2);
	font-size: calc(36vw / 19.2);
	font-weight: 400;
	padding: 0 calc(32vw / 19.2);
	height: calc(82vw / 19.2);
`;

const TournamentTitle = styled.div`
	width: calc(100vw / 19.2);
	overflow: none;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-weight: 500;
	font-size: calc(32vw / 19.2);
`;

const Placement = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	.placement {
		font-weight: 600;
		font-size: calc(42vw / 19.2);
	}

	.suffix {
		font-size: calc(24vw / 19.2);
	}
`;

const TournamentLogo = styled.img`
	width: calc(60vw / 19.2);
	height: calc(60vw / 19.2);
	border-radius: calc(10vw / 19.2);
	margin: 0 calc(4vw / 19.2);
`;

const MatchContainer = styled(DataBackground)`
	justify-content: space-between;
	align-items: center;

	.tag {
		font-weight: 500;
		font-size: calc(32vw / 19.2);
	}

	.score {
		color: ${THEME_SECONDARY};
		font-weight: 800;
		font-size: calc(42vw / 19.2);
	}

	.vs {
		font-size: calc(24vw / 19.2);
		color: ${THEME_SECONDARY};
	}
`;

const MatchPlayer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1;
`;

const TitleLogo = styled.img`
	height: 100%;
	width: auto;
`;

const Empty = styled.div`
	font-weight: 300;
	font-size: calc(32vw / 19.2);
`;

interface CharacterDisplayProps {
	characterId: CharacterId;
}

// TODO: Make image url into common function
const CharacterDisplay = ({ characterId }: CharacterDisplayProps) => {
	return (
		<CharacterContainer>
			{/* <div className='label'>Mains</div> */}
			<FadeContainer id={characterId?.toString() ?? 'Default'}>
				<CharacterPortrait characterId={characterId} />
			</FadeContainer>
		</CharacterContainer>
	);
};

interface TournamentResultProps {
	tournament: PlayerCardPlacement;
}

const TournamentResult = ({ tournament }: TournamentResultProps) => {
	const { name, placement, iconSrc } = tournament;

	return (
		<DataBackground>
			<Placement>
				<span className='placement'>{placement}</span>
				<span className='suffix'>{getNumberSuffix(placement)}</span>
			</Placement>
			<TournamentLogo src={iconSrc || '/assets/logos/logo.svg'} alt='' />
			<TournamentTitle>
				{name.length > 25 ? `${name.slice(0, 28).trim()}...` : name}
			</TournamentTitle>
		</DataBackground>
	);
};

interface MatchResultProps {
	tag: string;
	match: PlayerCardMatch;
}

const MatchResult = ({ tag, match }: MatchResultProps) => {
	const { player1Tag, player1Score, player2Tag, player2Score } = match;

	const leftPlayer = {
		tag: tag === player1Tag ? player1Tag : player2Tag,
		score: tag === player1Tag ? player1Score : player2Score,
	};
	const rightPlayer = {
		tag: tag === player1Tag ? player2Tag : player1Tag,
		score: tag === player1Tag ? player2Score : player1Score,
	};

	return (
		<MatchContainer>
			<MatchPlayer>
				<span className='score'>{leftPlayer.score}</span>
				<span className='tag'>{trimNamePrefix(leftPlayer.tag)}</span>
			</MatchPlayer>
			<span className='vs'>vs</span>
			<MatchPlayer>
				<span className='tag'>{trimNamePrefix(rightPlayer.tag)}</span>
				<span className='score'>{rightPlayer.score}</span>
			</MatchPlayer>
		</MatchContainer>
	);
};

const PlayerCardPage = () => {
	const playerCardData = useSelector(
		(state: AppState) => state.dataState.playerCard
	);

	const {
		tag,
		team,
		matches,
		placements,
		twitch,
		twitter,
		seed,
		// state,
		countryCode,
		pronoun,
	} = playerCardData;

	return (
		<PlayerCardContainer>
			<PageContent>
				<SectionContainer>
					<SeedContainer>
						<div className='title'>Seed</div>
						<span className='seed'>
							<Fade>{seed}</Fade>
						</span>
					</SeedContainer>
					<CharacterDisplay characterId={playerCardData.characterId} />
				</SectionContainer>
				<SectionContainer style={{ flex: '1' }}>
					<MainContainer>
						<TeamLogo src='/assets/logos/logo.svg' alt='' />
						<MainHeader>
							<FadeContainer id={countryCode}>
								<LocationContainer>
									<Flag code={countryCode} height={36} />
									<span>{getCountryAlias(countryCode)}</span>
								</LocationContainer>
							</FadeContainer>
							<FadeContainer id={`${team}-${tag}`}>
								<TagContainer>
									<span className='team'>{team}</span>{' '}
									<span className='tag'>{tag}</span>
								</TagContainer>
							</FadeContainer>
							<FadeContainer id={`${twitter}-${twitch}`}>
								<SocialsContainer>
									<div className='social'>{pronoun}</div>
									{twitter && (
										<div className='social'>
											<SiTwitter className='icon' />
											<span>{twitter}</span>
										</div>
									)}
									{twitch && (
										<div className='social'>
											<SiTwitch className='icon' />
											<span>{twitch}</span>
										</div>
									)}
								</SocialsContainer>
							</FadeContainer>
						</MainHeader>
						<Divider />
						<MainContent>
							<DataSection>
								<SectionHeader>Results This Tournament</SectionHeader>
								<FadeContainer
									id={matches.map((match) => match.roundName).join('-')}
									style={{ display: 'flex', flex: '1' }}
								>
									<DataList>
										{matches.length ? (
											matches.map((match) => (
												<MatchResult tag={tag} match={match} />
											))
										) : (
											<Empty>(No Sets Played)</Empty>
										)}
									</DataList>
								</FadeContainer>
							</DataSection>
							<DataSection>
								<SectionHeader>Recent Placements</SectionHeader>
								<FadeContainer
									id={placements.map((placement) => placement.name).join('-')}
									style={{ display: 'flex', flex: '1' }}
								>
									<DataList>
										{placements.length ? (
											placements.map((placement) => (
												<TournamentResult tournament={placement} />
											))
										) : (
											<Empty>(No Tournament Data)</Empty>
										)}
									</DataList>
								</FadeContainer>
							</DataSection>
						</MainContent>
					</MainContainer>
					<Footer>
						<TitleLogo src='/assets/logos/title-logo.png' alt='' />
					</Footer>
				</SectionContainer>
			</PageContent>
			<Ticker />
		</PlayerCardContainer>
	);
};

export default PlayerCardPage;
