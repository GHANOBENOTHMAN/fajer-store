const db = require('./db');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);
        const { firstname, lastname, phone, email, skills } = data;

        // Validate required fields
        if (!firstname || !lastname || !phone || !email || !skills || skills.length === 0) {
            return { statusCode: 400, body: JSON.stringify({ message: 'Missing required fields' }) };
        }

        // Insert into database
        // Note: skills is an array, we'll store it as a comma-separated string or JSON array
        const query = `
      INSERT INTO workers (first_name, last_name, phone, email, skills, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id;
    `;

        // Convert skills array to string (e.g., "plumbing, carpentry")
        const skillsString = Array.isArray(skills) ? skills.join(', ') : skills;

        const result = await db.query(query, [
            firstname,
            lastname,
            phone,
            email,
            skillsString
        ]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Worker registered successfully', id: result.rows[0].id }),
        };

    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
