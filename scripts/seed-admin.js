try { require('dotenv').config({ path: '.env' }); } catch (e) { /* ignore */ }
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

    // Create tables if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS newspapers (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        year VARCHAR(20) NOT NULL,
        pdf_path VARCHAR(255) NOT NULL,
        cover_path VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const passwordHash = await bcrypt.hash('ComitatoStudentesco2526', 10);
    
    // Insert or Update admin user using ON DUPLICATE KEY UPDATE
    await connection.execute(`
      INSERT INTO users (id, email, password)
      VALUES (1, 'comitato.studentesco@itispaleocapa.it', ?)
      ON DUPLICATE KEY UPDATE password = VALUES(password), email = VALUES(email)
    `, [passwordHash]);

    console.log('Tables initialized and Admin user seeded: comitato.studentesco@itispaleocapa.it');
    await connection.end();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedAdmin();
