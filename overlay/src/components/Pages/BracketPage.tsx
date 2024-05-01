import styled from '@emotion/styled';
import OverlayContainer from '../Containers/OverlayContainer';
import { PrimaryGradient } from '@common/constants/styles.ts';
import Ticker from '../Widgets/Ticker/Ticker';
import Match from '@assets/elements/match.png';
import { THEME_PRIMARY } from '@common/constants/colors.ts';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { BracketMatch } from '@common/interfaces/Data';
import Crown from '@assets/icons/crown.svg';
import Fade, { FadeContainer } from '../Fade';

const BracketContainer = styled(OverlayContainer)`
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: calc(48vw / 19.2);
	position: relative;
	background: ${PrimaryGradient};
	background-size: calc(1920vw / 19.2) calc(1080vw / 19.2);
	background-position: left;
`;

const ContentContainer = styled.section`
	display: flex;
	flex-direction: column;
	gap: calc(72vw / 19.2);
`;

const MatchContainer = styled.div`
	position: relative;
	width: calc(375vw / 19.2);
	height: calc(105vw / 19.2);
	display: flex;
	flex-direction: column;
`;

const MatchBackground = styled.img`
	width: calc(375vw / 19.2);
	height: calc(105vw / 19.2);
	position: absolute;
	top: calc(2vw / 19.2);
	z-index: -1;
`;

const PlayerContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 0 0 calc(36vw / 19.2);
	flex: 1;
	justify-content: space-between;
	font-size: calc(20vw / 19.2);
	font-weight: 700;
	text-transform: uppercase;
`;

const TagContainer = styled.div`
	display: flex;
	align-items: center;
`;

const ScoreContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(51vw / 19.2);
	width: calc(51vw / 19.2);
	font-size: calc(26vw / 19.2);
	position: absolute;
	right: 0;
`;

const BracketLine = styled.div`
	background: ${THEME_PRIMARY};
	height: calc(1vw / 19.2);
	width: calc(81vw / 19.2);
`;

const VertexContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: calc(137vw / 19.2);
	width: calc(81vw / 19.2);
	align-items: center;
`;

const VertexLine = styled.div`
	background: ${THEME_PRIMARY};
	height: calc(1vw / 19.2);
`;

const VertexLineContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	flex: 1;
`;

const VertexConnector = styled.div`
	background: ${THEME_PRIMARY};
	height: 100%;
	width: calc(1vw / 19.2);
`;

const SideContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const BracketSectionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const DoubleMatchContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: calc(31vw / 19.2);
`;

const RoundContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: calc(36vw / 19.2);
`;

const RoundLabel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: calc(290vw / 19.2);
	border-radius: calc(10vw / 19.2);
	background: rgba(0, 0, 0, 0.7);
	text-transform: uppercase;
	font-size: calc(22vw / 19.2);
	padding: calc(8vw / 19.2);
	justify-self: center;
	font-family: Oswald;
	font-weight: 400;
`;

const LabelContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, calc(375vw / 19.2));
	width: 100%;
	margin-bottom: calc(36vw / 19.2);
	column-gap: calc(81vw / 19.2);
`;

const BracketSeparator = styled(motion.div)`
	height: calc(1vw / 19.2);
	width: 100%;
	background: rgba(0, 0, 0, 0.2);
`;

const CrownImage = styled.img`
	width: calc(24vw / 19.2);
	height: calc(24vw / 19.2);
	margin-right: calc(10vw / 19.2);
`;

const Placeholder = styled.span`
	font-weight: 700;
	font-style: italic;
	opacity: 0.5;
`;

const BracketVertex = ({ alt }: { alt: boolean }) => {
	return (
		<VertexContainer>
			<VertexLineContainer>
				<VertexLine />
				<VertexLine />
			</VertexLineContainer>
			{!alt && <VertexConnector />}
			{!alt && <VertexLine style={{ flex: 1 }} />}
		</VertexContainer>
	);
};

BracketVertex.defaultProps = {
	alt: false,
};

interface MatchPlayerProps {
	tag: string;
	score: number;
	winner: boolean;
	showScore: boolean;
	style?: React.CSSProperties;
	placeholder?: string;
}

// TODO: Placeholder text
const MatchPlayer = ({
	tag,
	score,
	winner,
	showScore,
	style,
	placeholder,
}: MatchPlayerProps) => {
	return (
		<PlayerContainer style={style}>
			<FadeContainer
				id={`${tag}-${winner ? 'win' : 'loss'}`}
				style={{ display: 'flex', flexDirection: 'row' }}
			>
				<TagContainer>
					{winner && <CrownImage src={Crown} alt='' />}
					{tag.length > 0 ? tag : <Placeholder>{placeholder}</Placeholder>}
				</TagContainer>
			</FadeContainer>

			{showScore && (
				<ScoreContainer>
					<Fade>{score ?? 0}</Fade>
				</ScoreContainer>
			)}
		</PlayerContainer>
	);
};

interface BracketMatchProps {
	match: BracketMatch;
	style?: React.CSSProperties;
}

const SingleBracketMatch = ({ match, style }: BracketMatchProps) => {
	const { p1tag, p2tag, p1score, p2score, completed } = match;

	const showScore = p1tag?.length > 0 && p2tag?.length > 0;

	return (
		<MatchContainer style={style}>
			<MatchPlayer
				tag={p1tag}
				score={p1score}
				winner={completed && p1score > p2score}
				showScore={showScore}
			/>
			<MatchPlayer
				tag={p2tag}
				score={p2score}
				winner={completed && p1score < p2score}
				style={{ marginTop: 'calc(1vw / 19.2)' }}
				showScore={showScore}
			/>
			<MatchBackground src={Match} alt='' />
		</MatchContainer>
	);
};

interface DoubleBracketMatchProps {
	topMatch: BracketMatch;
	bottomMatch: BracketMatch;
}

const DoubleBracketMatch = ({
	topMatch,
	bottomMatch,
}: DoubleBracketMatchProps) => {
	return (
		<RoundContainer>
			<BracketSectionContainer>
				<DoubleMatchContainer>
					<SingleBracketMatch match={topMatch} />
					<SingleBracketMatch match={bottomMatch} />
				</DoubleMatchContainer>
			</BracketSectionContainer>
		</RoundContainer>
	);
};

const BracketPage = () => {
	const bracketState = useSelector(
		(state: AppState) => state.dataState.bracket
	);

	const reset =
		bracketState.gf.completed &&
		bracketState.gf.p2score > bracketState.gf.p1score;

	const resetStyle = { opacity: !reset ? 0.4 : 1 };

	return (
		<BracketContainer>
			<Ticker delay={0} yTransition={-50} />
			<ContentContainer>
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.75, delay: 0.5 }}
				>
					<LabelContainer>
						<RoundLabel>Winners Semifinal</RoundLabel>
						<RoundLabel>Winners Final</RoundLabel>
						<RoundLabel>Grand Final</RoundLabel>
						<RoundLabel style={resetStyle}>Grand Final Reset</RoundLabel>
					</LabelContainer>
					<SideContainer>
						<DoubleBracketMatch
							topMatch={bracketState.wsfTop}
							bottomMatch={bracketState.wsfBottom}
						/>
						<BracketVertex />
						<SingleBracketMatch match={bracketState.wf} />
						<BracketLine />
						<SingleBracketMatch match={bracketState.gf} />
						<BracketLine style={resetStyle} />
						<SingleBracketMatch
							style={resetStyle}
							match={bracketState.gfReset}
						/>
					</SideContainer>
				</motion.div>
				<BracketSeparator
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.75, delay: 0.5 }}
				/>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.75, delay: 0.5 }}
				>
					<LabelContainer>
						<RoundLabel>Losers Eights</RoundLabel>
						<RoundLabel>Losers Quarterfinals</RoundLabel>
						<RoundLabel>Losers Semifinal</RoundLabel>
						<RoundLabel>Losers Final</RoundLabel>
					</LabelContainer>
					<SideContainer>
						<DoubleBracketMatch
							topMatch={bracketState.lr1Top}
							bottomMatch={bracketState.lr1Bottom}
						/>
						<BracketVertex alt />
						<DoubleBracketMatch
							topMatch={bracketState.lqfTop}
							bottomMatch={bracketState.lqfBottom}
						/>
						<BracketVertex />
						<SingleBracketMatch match={bracketState.lsf} />
						<BracketLine />
						<SingleBracketMatch match={bracketState.lf} />
					</SideContainer>
				</motion.div>
			</ContentContainer>
			<Ticker delay={0} direction='left' />
		</BracketContainer>
	);
};

export default BracketPage;
