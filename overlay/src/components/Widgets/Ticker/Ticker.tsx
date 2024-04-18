import styled from '@emotion/styled';
import { THEME_PRIMARY } from '../../../common/constants/colors';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const TICKER_HEIGHT = 'calc(42vw / 19.2)';

const TickerContainer = styled(motion.section)`
	background: rgba(0, 0, 0, 0.75);
	border-top: calc(2vw / 19.2) solid ${THEME_PRIMARY};
	border-bottom: calc(2vw / 19.2) solid ${THEME_PRIMARY};
	width: 100%;
	height: calc(34vw / 19.2) !important;
	text-transform: uppercase;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: calc(16vw / 19.2);
	height: ${TICKER_HEIGHT};
	font-family: Oswald;
	font-weight: 300;
	leading-trim: both;
	text-edge: cap;
	line-height: normal;
	-webkit-line-clamp: 1;
	overflow: hidden;
	position: relative;
	z-index: 5;
`;

const TickerContent = styled.span`
	white-space: nowrap;
	display: flex;
	flex-direction: row;
`;

interface TickerProps {
	delay: number;
	yTransition?: number;
	noAnim: boolean;
	direction?: 'left' | 'right';
}

const Ticker = ({ delay, noAnim, yTransition, direction }: TickerProps) => {
	const items = ['Powered By Tourney Hero', 'A Melee Tournament Tool'];

	const text = items.map((item, i) => (
		<>
			<span key={`${item}-${i}-•`} style={{ margin: '0 calc(6vw / 19.2' }}>
				•
			</span>
			<span key={`${item}-${i}`}>{item}</span>
		</>
	));

	return (
		<TickerContainer
			initial={!noAnim ? { y: yTransition } : {}}
			animate={!noAnim ? { y: 0 } : {}}
			transition={{ duration: 0.75, delay: delay }}
		>
			<Marquee speed={20} autoFill direction={direction || 'right'}>
				<TickerContent>{text}</TickerContent>
			</Marquee>
		</TickerContainer>
	);
};

Ticker.defaultProps = {
	delay: 1.25,
	yTransition: 50,
	noAnim: false,
};

export default Ticker;
