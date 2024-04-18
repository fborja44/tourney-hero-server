import styled from '@emotion/styled';

const OverlayContainer = styled.main`
    width: calc(1920vw / 19.2);
	height: calc(1080vw / 19.2);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    z-index: -10;
`;

export const OverlayContainerReverse = styled.main`
    width: calc(1920vw / 19.2);
	height: calc(1080vw / 19.2);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    overflow: hidden;
    z-index: -10;
`;

export default OverlayContainer;
