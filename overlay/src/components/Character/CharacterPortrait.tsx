import styled from '@emotion/styled';
import { CharacterId } from '@common/interfaces/Types';

interface CharacterPortraitProps {
	characterId: CharacterId;
	side: 'left' | 'right';
}

export const CharacterPortraitImg = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: top;
	top: 0;
	left: 0;
	z-index: 5;
	border-radius: calc(15vw / 19.2);
`;

const CharacterPortrait = ({ characterId, side }: CharacterPortraitProps) => {
	return (
		<CharacterPortraitImg
			src={`/assets/portraits/${side}/${encodeURIComponent(
				characterId ?? 'Default'
			)}.png`}
			alt=''
		/>
	);
};

CharacterPortrait.defaultProps = {
	side: 'left',
};

export default CharacterPortrait;
