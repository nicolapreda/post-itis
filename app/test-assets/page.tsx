
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default function TestAssetsPage() {
  const assetsDir = path.join(process.cwd(), 'public/assets');
  let files: string[] = [];
  
  try {
    files = fs.readdirSync(assetsDir).filter(f => f.match(/\.(jpg|png|pdf)$/));
  } catch (e) {
    return <div>Error reading assets dir: {JSON.stringify(e)}</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Asset Debugger</h1>
      <p className="mb-4">Checking content of <code>public/assets</code></p>
      
      <div className="grid grid-cols-2 gap-4">
        {files.map(file => (
          <div key={file} className="border p-4 rounded">
            <h3 className="font-mono text-sm mb-2">{file}</h3>
            <div className="flex gap-4">
              <div className="w-1/2">
                <p className="text-xs text-gray-500 mb-1">Standard &lt;img&gt; tag:</p>
                <img 
                  src={`/assets/${file}`} 
                  alt={file} 
                  className="w-full h-auto border border-red-500"
                  style={{ minHeight: '50px' }}
                />
              </div>
            </div>
            <div className="mt-2 text-xs">
              <a href={`/assets/${file}`} target="_blank" className="text-blue-500 underline">Open Direct Link</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
