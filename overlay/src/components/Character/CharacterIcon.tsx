import styled from '@emotion/styled';
import { CharacterId } from '@common/interfaces/Types';

const CharacterIconImg = styled.img`
	width: calc(28vw / 19.2);
	height: calc(28vw / 19.2);
`;

interface CharacterProps {
	characterId: CharacterId;
	style?: React.CSSProperties;
}

const CharacterIcon = ({ characterId, style }: CharacterProps) => {
	return (
		characterId !== null && characterId < 26 && (
			<CharacterIconImg
				className='char-icon'
				style={style}
				alt=''
				src={`/assets/stockicons/${encodeURIComponent(characterId)}/0/stock.png`}
			/>
		)
	);
};

export default CharacterIcon;
