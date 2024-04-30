import { motion } from 'framer-motion';

interface FadeInProps {
	children: React.ReactNode;
	duration: number;
	delay: number;
}

const FadeIn = ({ children, duration, delay }: FadeInProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: duration, delay: delay }}
			style={{ all: 'inherit' }}
		>
			{children}
		</motion.div>
	);
};

FadeIn.defaultProps = {
	delay: 0,
	duration: 0.75,
};

export default FadeIn;
