import Joi from 'joi';

export const JoiUsername = Joi.string().alphanum().min(4).max(24);
export const JoiPassword = Joi.string().alphanum().min(6).max(32).allow('');

const JoiAuth = Joi.object({
	password: JoiPassword,
	perm: Joi.string().valid('READ', 'WRITE'),
}).required();

export default JoiAuth;
