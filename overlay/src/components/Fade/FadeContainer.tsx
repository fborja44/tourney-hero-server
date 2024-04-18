import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface FadeContainer {
	children: React.ReactNode;
	id: string;
	duration: number;
	delay: number;
	style?: React.CSSProperties;
}

const FadeContainer = ({ children, id, style, duration, delay }: FadeContainer) => {
	return (
		<AnimatePresence mode='wait'>
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
		</AnimatePresence>
	);
};

FadeContainer.defaultProps = {
	delay: 0,
	duration: 0.5,
};

export default FadeContainer;
