import { AnimatePresence } from 'framer-motion';
import FadeDiv from './FadeDiv';

interface FadeProps {
	children: string | number | undefined;
}

const Fade = ({ children }: FadeProps) => (
	<AnimatePresence mode='wait'>
		<FadeDiv key={children}>{children}</FadeDiv>
	</AnimatePresence>
);

export default Fade;
