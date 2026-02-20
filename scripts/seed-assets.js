
try { require('dotenv').config({ path: '.env' }); } catch (e) { /* ignore */ }
const mysql = require('mysql2/promise');

const newspapers = [
  { title: 'Aprile 2018', year: '2017-2018', pdf: '/assets/1_Numero.pdf', cover: '/assets/1_Numero.jpg' },
  { title: 'Maggio 2018', year: '2017-2018', pdf: '/assets/2_Numero.pdf', cover: '/assets/2_Numero.jpg' },
  { title: 'Dicembre 2018', year: '2018-2019', pdf: '/assets/3_Numero.pdf', cover: '/assets/3_Numero.jpg' },
  { title: 'Febbraio 2019', year: '2018-2019', pdf: '/assets/4_Numero.pdf', cover: '/assets/4_Numero.jpg' },
  { title: 'Maggio 2019', year: '2018-2019', pdf: '/assets/5_Numero.pdf', cover: '/assets/5_Numero.jpg' },
  { title: 'Gennaio 2020', year: '2019-2020', pdf: '/assets/6_Numero.pdf', cover: '/assets/6_Numero.png' },
  { title: 'Giugno 2020', year: '2019-2020', pdf: '/assets/7_Numero.pdf', cover: '/assets/7_Numero.png' },
];

async function seedAssets() {
    console.log('Seeding assets...');
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT) || 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        // Use DELETE as truncate isn't always allowed or same
        await connection.execute('DELETE FROM newspapers');

        for (const paper of newspapers) {
            await connection.execute(
                'INSERT INTO newspapers (title, year, pdf_path, cover_path) VALUES (?, ?, ?, ?)',
                [paper.title, paper.year, paper.pdf, paper.cover]
            );
            console.log(`Inserted: ${paper.title}`);
        }

        console.log('Seeding complete!');
        await connection.end();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seedAssets();
