import connection from '../configs/db.js';

export async function createTable() {
	try {
		const query = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        latitude FLOAT,
        longitude FLOAT
      )
    `;

		connection.query(query);

		console.log('Schools table created or already exists');
	} catch (error) {
		console.error('Error creating table:', error);
	}
}
