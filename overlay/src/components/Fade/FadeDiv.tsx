import { motion, HTMLMotionProps } from 'framer-motion';

interface FadeDivProps extends HTMLMotionProps<'div'> {
	children: React.ReactNode;
	duration: number;
	delay: number;
	style?: React.CSSProperties;
}

const FadeDiv = ({ children, style, duration, delay, id }: FadeDivProps) => {
	return (
		<motion.div
			key={id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: duration, delay: delay }}
			style={style}
		>
			{children}
		</motion.div>
	);
};

FadeDiv.defaultProps = {
	delay: 0,
	duration: 0.5,
};

export default FadeDiv;
