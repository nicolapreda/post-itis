
import UrbanGrid from '@/components/UrbanGrid';
import db from '@/lib/db';

// Define the shape of our data
interface Newspaper {
  id: number;
  title: string;
  coverPath: string | null;
  pdfPath: string;
  year: string;
}

// Force dynamic rendering since we are fetching from DB
export const dynamic = 'force-dynamic';

export default async function Home() {
  let newspapers: Newspaper[] = [];
  
  try {
    // In a Server Component, we can query the DB directly!
    // better-sqlite3's .all() returns an array of objects
    const [rows] = await db.query('SELECT * FROM newspapers ORDER BY year DESC, title DESC');
    
    // Map snake_case DB columns to camelCase Props
    newspapers = (rows as any[]).map(row => ({
      id: row.id,
      title: row.title,
      year: row.year,
      coverPath: row.cover_path,
      pdfPath: row.pdf_path
    }));
  } catch (error) {
    console.error('Failed to fetch newspapers:', error);
  }

  return (
    <main className="min-h-screen">
      <UrbanGrid newspapers={newspapers} />
    </main>
  );
}
