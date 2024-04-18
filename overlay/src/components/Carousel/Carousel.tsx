import { AnimatePresence } from 'framer-motion';
import FadeDiv from '../Fade/FadeDiv';
import { useEffect, useState } from 'react';

interface Element {
	key: string | number | null;
	component: React.ReactNode;
}

interface CarouselProps {
	elements: Element[];
	timer: number;
	style?: React.CSSProperties;
}

const Carousel = ({ elements, style, timer }: CarouselProps) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % elements.length);
		}, timer * 1000);

		return () => clearInterval(interval);
	}, [elements.length, timer]);

	return (
		<AnimatePresence mode='wait'>
			<FadeDiv key={index} style={style} delay={0.35}>
				{elements[index].component}
			</FadeDiv>
		</AnimatePresence>
	);
};

Carousel.defaultProps = {
	timer: 10,
};

export default Carousel;
