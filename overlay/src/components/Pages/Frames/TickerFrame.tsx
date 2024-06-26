import OverlayContainer from '../../Containers/OverlayContainer';
import Ticker from '../../Widgets/Ticker/Ticker';
import { Frame } from './Frame';

export const TickerPage = () => {
	return (
		<OverlayContainer>
			<Ticker noAnim />
		</OverlayContainer>
	);
};

interface TickerFrameProps {
	zIndex?: number;
}

const TickerFrame = ({ zIndex }: TickerFrameProps) => {
	return <Frame src='/ticker' style={{ zIndex: zIndex ?? 0 }} />;
};

export default TickerFrame;
