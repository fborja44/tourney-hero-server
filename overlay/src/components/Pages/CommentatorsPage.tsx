import styled from '@emotion/styled';
import OverlayContainer from '../Containers/OverlayContainer';
import { DropShadow, PrimaryGradient } from '@common/constants/styles.ts';
import Ticker from '../Widgets/Ticker/Ticker';
import Mic from '../../assets/icons/mic.svg';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import {
	DEFAULT_BACKGROUND,
	THEME_PRIMARY,
	THEME_SECONDARY,
} from '@common/constants/colors';
import InfoContainer from '../Widgets/InfoContainer/InfoContainer';
import Fade, { FadeContainer } from '../Fade';
import { SidedElement } from '@common/interfaces/Types';

const CommentatorsContainer = styled(OverlayContainer)`
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: calc(0vw / 19.2);
	position: relative;
	background: ${PrimaryGradient};
	background-size: calc(1920vw / 19.2) calc(1080vw / 19.2);
	background-position: left;
`;

const ContentContainer = styled.section`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	gap: calc(68vw / 19.2);
`;

const CommentatorContainer = styled.section`
	display: flex;
	flex-direction: row;
	gap: calc(64vw / 19.2);
`;

const CommentatorContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: calc(24vw / 19.2);
`;

const CommentatorLabel = styled(InfoContainer)<SidedElement>`
	padding: calc(16vw / 19.2) calc(24vw / 19.2);
	gap: calc(16vw / 19.2);
	flex-direction: ${(props) =>
		props.side === 'right' ? 'row-reverse' : 'row'};
	align-items: center;

	img {
		height: calc(24vw / 19.2);
		width: auto;
	}

	.none {
		font-style: italic;
	}
`;

const VideoFrame = styled.div`
	background: ${DEFAULT_BACKGROUND};
	border: calc(8vw / 19.2) solid ${THEME_PRIMARY};
	width: calc(850vw / 19.2);
	height: calc(478vw / 19.2);
	box-shadow: ${DropShadow};
	border-radius: calc(15vw / 19.2);
`;

const MatchInfoContainer = styled(InfoContainer)`
	align-items: center;
	justify-content: space-between;
	font-size: calc(36vw / 19.2);
	border-radius: calc(20vw / 19.2);
	font-family: Oswald;
	text-transform: uppercase;
	padding: calc(12vw / 19.2) calc(64vw / 19.2);
`;

const PlayerInfo = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: calc(48vw / 19.2);

	.score-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: calc(32vw / 19.2);
	}

	.tag {
		font-size: calc(48vw / 19.2);
	}

	.score {
		color: ${THEME_SECONDARY};
		font-size: calc(68vw / 19.2);
	}

	.vs {
		color: ${THEME_SECONDARY};
	}
`;

const TitleLogo = styled.img`
	width: calc(472vw / 19.2);
	height: auto;
`;

interface CommentatorProps {
	name: string;
	side: 'left' | 'right';
}

const Commentator = ({ name, side }: CommentatorProps) => {
	return (
		<CommentatorContent>
			<VideoFrame />
			<CommentatorLabel side={side}>
				<img src={Mic} alt='' />
				<span className={name ? '' : 'none'}>
					<Fade>{name || 'None'}</Fade>
				</span>
			</CommentatorLabel>
		</CommentatorContent>
	);
};

const CommentatorsPage = () => {
	const { gameplay, commentators } = useSelector(
		(state: AppState) => state.dataState
	);

	return (
		<CommentatorsContainer>
			<ContentContainer>
				<TitleLogo src='/assets/logos/title-logo.png' alt='' />
				<CommentatorContainer>
					<Commentator name={commentators.commentator1} side='left' />
					<Commentator name={commentators.commentator2} side='right' />
				</CommentatorContainer>
				<MatchInfoContainer>
					<FadeContainer
						id={`${gameplay.player1.tag}-${gameplay.player1.score}-${gameplay.player2.score}-${gameplay.player2.tag}`}
					>
						<PlayerInfo>
							<span className='score'>{gameplay.player1.score}</span>
							<span className='tag'>{gameplay.player1.tag}</span>
							<span className='vs'>vs</span>
							<span className='tag'>{gameplay.player2.tag}</span>
							<span className='score'>{gameplay.player2.score}</span>
						</PlayerInfo>
					</FadeContainer>
					<FadeContainer
						id={`${gameplay.eventName}-${gameplay.bracketName}-${gameplay.roundName}`}
					>
						<span>{gameplay.bracketName}</span>
						{gameplay.bracketName && gameplay.roundName && ' - '}
						<span>{gameplay.roundName}</span>
					</FadeContainer>
				</MatchInfoContainer>
			</ContentContainer>
			<Ticker delay={0} />
		</CommentatorsContainer>
	);
};

export default CommentatorsPage;
