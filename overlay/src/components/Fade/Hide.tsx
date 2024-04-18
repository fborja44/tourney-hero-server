import { AnimatePresence } from 'framer-motion';
import FadeDiv from './FadeDiv';

interface HideProps {
	show: boolean;
	duration?: number;
	delay?: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}

const Hide = ({ show, duration, delay, children, style }: HideProps) => {
	return (
		<AnimatePresence>
			{show && (
				<FadeDiv duration={duration} style={style} delay={delay}>
					{children}
				</FadeDiv>
			)}
		</AnimatePresence>
	);
};

export default Hide;
