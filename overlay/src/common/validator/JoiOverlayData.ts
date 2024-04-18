import Joi from 'joi';
import JoiGameplay from './JoiGameplay.ts';
import JoiCommentators from './JoiCommentators.ts';
import JoiBracket from './JoiBracket.ts';
import JoiPlayerCard from './JoiPlayerCard.ts';

const JoiOverlayData = Joi.object({
	gameplay: JoiGameplay.required(),
	commentators: JoiCommentators.required(),
	bracket: JoiBracket.required(),
	playerCard: JoiPlayerCard.required(),
});

export default JoiOverlayData;
