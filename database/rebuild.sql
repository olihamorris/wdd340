-- ==========================================
-- CSE Motors Database Rebuild File
-- SAFE FOR RENDER RESETS
-- ==========================================

-- ---------- CLEAN SLATE ----------
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TYPE IF EXISTS client_type;

-- ---------- ENUM ----------
CREATE TYPE client_type AS ENUM (
  'Client',
  'Employee',
  'Admin'
);

-- ---------- CLASSIFICATION ----------
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(30) NOT NULL
);

-- ---------- ACCOUNT ----------
CREATE TABLE account (
  account_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  account_firstname VARCHAR(30) NOT NULL,
  account_lastname VARCHAR(30) NOT NULL,
  account_email VARCHAR(50) UNIQUE NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type client_type DEFAULT 'Client'
);

-- ---------- INVENTORY ----------
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

-- ---------- DATA ----------
INSERT INTO classification (classification_name)
VALUES
  ('SUV'),
  ('Truck'),
  ('Sedan'),
  ('Sport'),
  ('Classic');

-- Sample inventory REQUIRED for later UPDATEs
INSERT INTO inventory (
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
)
VALUES (
  'GM',
  'Hummer',
  2022,
  'A tough vehicle with small interiors',
  '/images/hummer.png',
  '/images/hummer-tn.png',
  55000.00,
  12000,
  'Black',
  1
);

-- ---------- REQUIRED UPDATES ----------
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