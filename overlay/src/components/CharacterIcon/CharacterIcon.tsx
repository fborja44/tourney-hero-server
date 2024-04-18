import styled from '@emotion/styled';
import { Character } from '@common/interfaces/Types';

const CharacterIconImg = styled.img`
	width: calc(28vw / 19.2);
	height: calc(28vw / 19.2);
`;

interface CharacterProps {
	character: Character;
	style?: React.CSSProperties;
}

const CharacterIcon = ({ character, style }: CharacterProps) => {
	return (
		character !== 'Default' && (
			<CharacterIconImg
				className='char-icon'
				style={style}
				alt=''
				src={`/assets/stockicons/${encodeURIComponent(character)}.png`}
			/>
		)
	);
};

export default CharacterIcon;
