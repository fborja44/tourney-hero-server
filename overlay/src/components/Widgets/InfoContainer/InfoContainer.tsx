import styled from '@emotion/styled';
import { DropShadow, ItemBackground } from '@common/constants/styles';

const InfoContainer = styled.div`
	display: flex;
	background: ${ItemBackground};
	border-radius: calc(10vw / 19.2);
	padding: calc(8vw / 19.2) calc(18vw / 19.2);
	font-weight: 600;
	font-size: calc(20vw / 19.2);
	box-shadow: ${DropShadow};
`;

export default InfoContainer;
