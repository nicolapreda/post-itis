const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function run() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  try {
    const [rows] = await pool.query('SELECT id, title, year, cover_path FROM newspapers ORDER BY year DESC, title DESC LIMIT 10');
    console.log(rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
run();
