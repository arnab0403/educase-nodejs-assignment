import { addSchoolService, listSchoolsService } from '../models/schoolModel.js';

const handleResponse = (res, status, message, data = null) => {
	res.status(status).json({
		status,
		message,
		data,
	});
};

export const addSchool = async (req, res, next) => {
	try {
		// Validate input
		const { name, address, latitude, longitude } = req.body;

		const newschool = await addSchoolService(
			name,
			address,
			latitude,
			longitude,
		);

		handleResponse(res, 201, 'School added successfully', newschool);
	} catch (err) {
		console.error(err);
		next(err); // forward to error handler
	}
};

export const listSchools = async (req, res, next) => {
	try {
		const { latitude, longitude } = req.query;

		if (!latitude || !longitude) {
			return handleResponse(
				res,
				400,
				'Latitude and Longitude are required',
			);
		}

		const schools = await listSchoolsService(latitude, longitude);

		handleResponse(res, 200, 'Schools fetched successfully', schools);
	} catch (error) {
		next(error);
	}
};
