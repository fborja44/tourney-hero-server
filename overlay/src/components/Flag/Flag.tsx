import styled from '@emotion/styled';

interface FlagImageProps {
	height: number;
}

const FlagImg = styled.img<FlagImageProps>`
	height: calc(${(props) => props.height}vw / 19.2);
	width: auto;
`;

interface FlagProps {
	code: string;
	height: number;
}

const Flag = ({ code, height }: FlagProps) => {
	return (
		<FlagImg
			src={`node_modules/flag-icons/flags/4x3/${code.toUpperCase()}.svg`}
			height={height}
		/>
	);
};

Flag.defaultProps = {
	height: 24,
};

export default Flag;
