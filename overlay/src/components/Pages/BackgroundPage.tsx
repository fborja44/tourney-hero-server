import styled from '@emotion/styled';
import OverlayContainer from '../Containers/OverlayContainer';
import { PrimaryGradient } from '@common/constants/styles.ts';

const BackgroundPageContainer = styled(OverlayContainer)`
	background: ${PrimaryGradient};
`;

const BackgroundPage = () => {
	return <BackgroundPageContainer></BackgroundPageContainer>;
};

export default BackgroundPage;
