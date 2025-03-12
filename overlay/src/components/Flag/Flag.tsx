import styled from '@emotion/styled';

interface FlagImageProps {
	height: number;
}

const FlagSpan = styled.span<FlagImageProps>`
	height: calc(${(props) => props.height}vw / 19.2);
	width: calc(${(props) => props.height}vw / 19.2);
`;

interface FlagProps {
	code: string;
	height?: number;
}

const Flag = ({ code, height = 32 }: FlagProps) => {
	const className = `fi fi-${code.toLowerCase()}`;

	return <FlagSpan className={className} height={height}></FlagSpan>;
};

export default Flag;
