import connection from '../configs/db.js';

export const addSchoolService = async (name, address, latitude, longitude) => {
	const [result] = await connection.query(
		`INSERT INTO schools (name, address, latitude, longitude)
		 VALUES (?, ?, ?, ?)`,
		[name, address, latitude, longitude],
	);

	const [rows] = await connection.query(
		`SELECT * FROM schools WHERE id = ?`,
		[result.insertId],
	);

	return rows[0];
};

export const listSchoolsService = async (latitude, longitude) => {
	const [rows] = await connection.query(
		`
		SELECT 
			id,
			name,
			address,
			latitude,
			longitude,
			(
				6371 * acos(
					cos(radians(?)) *
					cos(radians(latitude)) *
					cos(radians(longitude) - radians(?)) +
					sin(radians(?)) *
					sin(radians(latitude))
				)
			) AS distance
		FROM schools
		ORDER BY distance ASC
		`,
		[latitude, longitude, latitude],
	);

	return rows;
};
