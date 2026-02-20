
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newspapers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year VARCHAR(20) NOT NULL,
  pdf_path VARCHAR(255) NOT NULL,
  cover_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial data if table is empty
INSERT IGNORE INTO newspapers (title, year, pdf_path) VALUES 
('Aprile 2018', '2017-2018', ''),
('Maggio 2018', '2017-2018', ''),
('Dicembre 2018', '2018-2019', '');
