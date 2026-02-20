
try { require('dotenv').config({ path: '.env' }); } catch (e) { /* ignore */ }
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(process.cwd(), 'public/assets');

async function smartSeed() {
  console.log('Starting smart seeding...');

  try {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    // Clear existing data
    await connection.execute('DELETE FROM newspapers');

    // Scan for files
    const files = fs.readdirSync(assetsDir);
    const pdfs = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    console.log(`Found ${pdfs.length} PDF files.`);

    for (const pdf of pdfs) {
        const basename = path.parse(pdf).name;
        
        // Try to find a matching cover image
        const potentialExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        let coverPath = null;

        for (const ext of potentialExtensions) {
            if (fs.existsSync(path.join(assetsDir, basename + ext))) {
                coverPath = `/assets/${basename}${ext}`;
                break;
            }
        }

        // Guess Year from filename
        let year = '2023-2024'; // Default
        if (pdf.includes('2018')) year = '2017-2018';
        if (pdf.includes('2019')) year = '2018-2019';
        if (pdf.includes('2020')) year = '2019-2020';
        if (pdf.includes('2021')) year = '2020-2021';
        if (pdf.includes('2022')) year = '2021-2022';
        if (pdf.includes('2023')) year = '2022-2023';
        if (pdf.includes('23-24') || pdf.includes('2024')) year = '2023-2024';

        // Pretty Title from filename
        let title = basename
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .replace(/(\d{4})/g, '') // Remove year from title if present
            .replace(/\s+/g, ' ')
            .trim();
        
        // Add "n." if it starts with a number and doesn't already have "Numero"
        if (/^\d/.test(title) && !title.toLowerCase().includes('numero')) {
            title = `Numero ${title}`;
        }

        const pdfPath = `/assets/${pdf}`;
        const finalCoverPath = coverPath ? coverPath : null;

        console.log(`Inserting: ${title} (${year}) - Cover: ${coverPath ? 'YES' : 'NO'}`);
        
        await connection.execute(
            'INSERT INTO newspapers (title, year, pdf_path, cover_path) VALUES (?, ?, ?, ?)',
            [title, year, pdfPath, finalCoverPath]
        );
    }

    console.log('Smart Seeding complete!');
    await connection.end();

  } catch (err) {
      console.error('Error during smart seeding:', err);
      process.exit(1);
  }
}

smartSeed();
