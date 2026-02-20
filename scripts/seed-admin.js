require('dotenv').config({ path: '.env' });
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  console.log('Seeding admin user...');

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const passwordHash = await bcrypt.hash('admin', 10);
    
    // Insert or Update admin user using ON DUPLICATE KEY UPDATE
    await connection.execute(`
      INSERT INTO users (id, email, password)
      VALUES (1, 'admin@postitis.it', ?)
      ON DUPLICATE KEY UPDATE password = VALUES(password)
    `, [passwordHash]);

    console.log('Admin user seeded: admin@postitis.it');
    await connection.end();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedAdmin();
