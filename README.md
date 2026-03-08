# EduCase API

This repository contains a simple Node.js/Express API for managing schools with location information. It uses MySQL for persistence and is configured via environment variables.

## Project Structure

```
src/
  configs/      # database connection configuration
  controllers/  # route handlers
  data/         # initialization scripts (table creation, SQL dump)
  middlewares/  # validation and error-handling middleware
  models/       # database query services
  routes/       # express routers
package.json
.env.example
README.md
```

## Configuration (.env)

Create a `.env` file at the root (copy from `.env.example`) with at least the following values:

```dotenv
PORT=5000

DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
```

- `PORT` : port the server will listen on (defaults to `3000` if not set).
- `DB_*` : connection details for your MySQL database. These are consumed by `src/configs/db.js` using `dotenv`.

> **Note:** the example file stores values with quotes, but the actual `.env` should not include them.

## Installation

```bash
npm install
```

## Development

Run the server with automatic restarts on change:

```bash
npm run dev
```

This invokes `nodemon` with `src/index.js`. Make sure your `.env` file is present before starting.

## Production

Build and start (there is no build step – just run the code directly):

```bash
npm start
```

Ensure environment variables are configured appropriately in your deployment environment.

## Database

On startup the application will automatically create the `schools` table if it doesn't exist by calling `createTable()` in `src/data/createSchoolTable.js`. You can also import the SQL in `src/data/schoolTable.sql` manually if preferred.

The table schema:

```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);
```

## API Endpoints

| Method | Path          | Description                      | Body/Query Params                                      |
| ------ | ------------- | -------------------------------- | ------------------------------------------------------ |
| POST   | `/api/school` | Add a new school                 | `name`, `address`, `latitude`, `longitude` (JSON body) |
| GET    | `/api/school` | List schools ordered by distance | `latitude`, `longitude` (query string)                 |
| GET    | `/test`       | Simple health check              | none                                                   |

Requests are validated with Joi; invalid payloads return 400 responses.

## Error Handling

Errors are forwarded to a global error middleware (`src/middlewares/errorHandler.js`) which logs stacks and responds with a 500 JSON message.

## Notes

- Ensure `dotenv` is a dependency so environment variables load in production.
- The database connection configuration uses default fallbacks when environment variables are missing.
- Example `.env` values (located in `.env.example`) should be replaced with your actual credentials and not checked into source control.

---

Feel free to extend this README with additional documentation or tests as the project grows.
