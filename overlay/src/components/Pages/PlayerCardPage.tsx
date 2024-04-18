import styled from '@emotion/styled';
import OverlayContainer from '../Containers/OverlayContainer';
import InfoContainer from '../Widgets/InfoContainer/InfoContainer';
import { PrimaryGradient } from '@common/constants/styles';
import { THEME_PRIMARY, THEME_SECONDARY } from '@common/constants/colors';
import Ticker from '../Widgets/Ticker/Ticker';
import { SiTwitch, SiTwitter } from 'react-icons/si';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../redux/reducers/rootReducer';

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

const CharacterImage = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: bottom top;
	bottom: 0;
	left: 0;
	border-radius: calc(15vw / 19.2);
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
	opacity: 0.2;
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

const FlagImage = styled.img`
	height: calc(48vw / 19.2);
	width: auto;
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
	flex: 1;
`;

const Placement = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	.placement {
		font-weight: 600;
		font-size: calc(48vw / 19.2);
	}

	.suffix {
		font-size: calc(30vw / 19.2);
	}
`;

const TournamentLogo = styled.img`
	width: calc(64vw / 19.2);
	height: calc(64vw / 19.2);
	border-radius: calc(10vw / 19.2);
`;

const MatchContainer = styled(DataBackground)`
	justify-content: space-between;

	.tag {
		font-weight: 500;
		font-size: calc(36vw / 19.2);
	}

	.score {
		color: ${THEME_SECONDARY};
		font-weight: 800;
		font-size: calc(36vw / 19.2);
	}

	.vs {
		font-size: calc(24vw / 19.2);
		color: ${THEME_SECONDARY};
	}
`;

const MatchPlayer = styled.div`
	display: flex;
	justify-content: space-between;
	flex: 1;
`;

const TitleLogo = styled.img`
	height: 100%;
	width: auto;
`;

const CharacterDisplay = () => {
	return (
		<CharacterContainer>
			<div className='label'>Mains</div>
			<CharacterImage
				src={`/assets/portraits/right/${encodeURIComponent('Falco')}.png`}
				alt=''
			/>
		</CharacterContainer>
	);
};

const TournamentResult = () => {
	return (
		<DataBackground>
			<Placement>
				<span className='placement'>5</span>
				<span className='suffix'>th</span>
			</Placement>
			<TournamentLogo src='/assets/logos/logo.svg' alt='' />
			<span className='title'>Tournament</span>
		</DataBackground>
	);
};

const MatchResult = () => {
	return (
		<MatchContainer>
			<MatchPlayer>
				<span className='score'>1</span>
				<span className='tag'>Player</span>
			</MatchPlayer>
			<span className='vs'>vs</span>
			<MatchPlayer>
				<span className='tag'>Player</span>
				<span className='score'>1</span>
			</MatchPlayer>
		</MatchContainer>
	);
};

const PlayerCardPage = () => {
	// const { showPhoto, playerTag } = useSelector(
	// 	(state: AppState) => state.dataState.playerCard
	// );

	return (
		<PlayerCardContainer>
			<PageContent>
				<SectionContainer>
					<SeedContainer>
						<div className='title'>Seed</div>
						<span className='seed'>1</span>
					</SeedContainer>
					<CharacterDisplay />
				</SectionContainer>
				<SectionContainer style={{ flex: '1' }}>
					<MainContainer>
						<TeamLogo src='/assets/logos/logo.svg' alt='' />
						<MainHeader>
							<LocationContainer>
								<FlagImage src='/assets/flags/us.png' alt='' />
								<span>United States</span>
							</LocationContainer>
							<TagContainer>
								<span className='team'>C9</span>{' '}
								<span className='tag'>Mang0</span>
							</TagContainer>
							<SocialsContainer>
								<div className='social'>
									<SiTwitter className='icon' />
									<span>C9Mang0</span>
								</div>
								<div className='social'>
									<SiTwitch className='icon' />
									<span>Mang0</span>
								</div>
							</SocialsContainer>
						</MainHeader>
						<Divider />
						<MainContent>
							<DataSection>
								<SectionHeader>Results This Tournament</SectionHeader>
								<MatchResult />
								<MatchResult />
								<MatchResult />
								<MatchResult />
							</DataSection>
							<DataSection>
								<SectionHeader>Recent Placements</SectionHeader>
								<TournamentResult />
								<TournamentResult />
								<TournamentResult />
								<TournamentResult />
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
