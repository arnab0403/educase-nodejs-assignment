import Joi from 'joi';

export const schoolSchema = Joi.object({
	name: Joi.string().min(3).max(255).required(),
	address: Joi.string().min(3).max(255).required(),
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
});

const validateSchool = (req, res, next) => {
	const { error } = schoolSchema.validate(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			message: error.message,
		});
	}
	next();
};

export default validateSchool;
