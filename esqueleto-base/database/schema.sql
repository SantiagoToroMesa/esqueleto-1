-- Database schema for CRUD Skeleton
-- Create this database first: CREATE DATABASE your_database;

USE your_database;

-- Entity 1 table
CREATE TABLE entity1 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Entity 2 table
CREATE TABLE entity2 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Entity 3 table (relationship table)
CREATE TABLE entity3 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entity1_id INT NOT NULL,
    entity2_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (entity1_id) REFERENCES entity1(id) ON DELETE RESTRICT,
    FOREIGN KEY (entity2_id) REFERENCES entity2(id) ON DELETE RESTRICT
);

-- Insert sample data
INSERT INTO entity1 (name, description) VALUES 
('Sample Entity 1', 'This is a sample description for entity 1'),
('Another Entity 1', 'Another sample description');

INSERT INTO entity2 (name, email, phone) VALUES 
('Sample Entity 2', 'sample@example.com', '123-456-7890'),
('Another Entity 2', 'another@example.com', '098-765-4321');

INSERT INTO entity3 (entity1_id, entity2_id, quantity) VALUES 
(1, 1, 5),
(1, 2, 3),
(2, 1, 2);
