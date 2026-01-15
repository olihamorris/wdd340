-- ==========================================
-- CSE Motors Database Rebuild File
-- ==========================================

-- ENUM
CREATE TYPE client_type AS ENUM (
  'Client',
  'Employee',
  'Admin'
);

-- Classification table
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(30) NOT NULL
);

-- Account table
CREATE TABLE account (
  account_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  account_firstname VARCHAR(30) NOT NULL,
  account_lastname VARCHAR(30) NOT NULL,
  account_email VARCHAR(50) UNIQUE NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type client_type DEFAULT 'Client'
);

-- Inventory table
CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(30) NOT NULL,
  inv_model VARCHAR(30) NOT NULL,
  inv_year INT NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  inv_price NUMERIC(10,2) NOT NULL,
  inv_miles INT,
  inv_color VARCHAR(30),
  classification_id INT NOT NULL,
  CONSTRAINT fk_classification
    FOREIGN KEY (classification_id)
    REFERENCES classification (classification_id)
);

-- Insert classifications
INSERT INTO classification (classification_name)
VALUES
  ('SUV'),
  ('Truck'),
  ('Sedan'),
  ('Sport'),
  ('Classic');

-- Insert sample inventory (GM Hummer example assumed exists)

-- COPIED FROM assignment2.sql (REQUIRED)
UPDATE inventory
SET inv_description = REPLACE(
  inv_description,
  'small interiors',
  'a huge interior'
)  
WHERE inv_model = 'Hummer';

UPDATE inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');  