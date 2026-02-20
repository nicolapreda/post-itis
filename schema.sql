-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create newspapers table
CREATE TABLE IF NOT EXISTS newspapers (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year VARCHAR(20) NOT NULL,
  pdf_path VARCHAR(255) NOT NULL,
  cover_path VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert Admin User (Password: ComitatoStudentesco2526)
INSERT INTO users (id, email, password)
VALUES (1, 'comitato.studentesco@itispaleocapa.it', '$2b$10$9lwsxD70HrdbYrBpwdB2rOhEtogR39UedgubGH8SEpBBCXGB71oYy')
ON DUPLICATE KEY UPDATE password = VALUES(password), email = VALUES(email);
