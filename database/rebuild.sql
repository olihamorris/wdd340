-- ==========================================
-- CSE Motors Database
-- Assignment 2 – Task 1 & Task 2
-- This file rebuilds the database if deleted
-- ==========================================

-- Create ENUM type for client types
 CREATE TYPE client_type AS ENUM (
  'Client',
  'Employee',
  'Admin'
);

-- Create classification table
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(30) NOT NULL
);

-- Create the inventory table
CREATE TABLE inventory (
  inv_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  inv_make CHARACTER VARYING NOT NULL,
  inv_model CHARACTER VARYING NOT NULL,
  classification_id INTEGER NOT NULL
);

-- Create the relationship
ALTER TABLE inventory
ADD CONSTRAINT fk_classification
FOREIGN KEY (classification_id)
REFERENCES classification (classification_id);

-- Create the account table
CREATE TABLE account (
  account_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  account_firstname CHARACTER VARYING NOT NULL,
  account_lastname CHARACTER VARYING NOT NULL,
  account_email CHARACTER VARYING NOT NULL,
  account_password CHARACTER VARYING NOT NULL,
  account_type account_type NOT NULL DEFAULT 'Client'
);

-- Insert classification data
INSERT INTO classification (classification_name)
VALUES
  ('SUV'),
  ('Truck'),
  ('Sedan'),
  ('Sports'),
  ('Classic');

  -- Create inventory table
CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(30) NOT NULL,
  inv_model VARCHAR(30) NOT NULL,
  inv_year INT NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  inv_price NUMERIC(10,2) NOT NULL,
  classification_id INT NOT NULL,
  CONSTRAINT fk_classification
    FOREIGN KEY (classification_id)
    REFERENCES classification (classification_id)
);

-- Create client table
CREATE TABLE client (
  client_id SERIAL PRIMARY KEY,
  client_firstname VARCHAR(30) NOT NULL,
  client_lastname VARCHAR(30) NOT NULL,
  client_email VARCHAR(50) UNIQUE NOT NULL,
  client_password VARCHAR(255) NOT NULL,
  client_type client_type DEFAULT 'Client'
);

--Insert invento ry data
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
) VALUES
(
  'Toyota',
  'RAV4',
  2020,
  'A clean and strong SUV for family trips.',
  '/images/vehicles/rav4.jpg',
  '/images/vehicles/rav4-tn.jpg',
  25000,
  30000,
  'Blue',
  1
);

  -- Copied for assignment2.sql
  -- Select inventory with classification name
SELECT
  i.inv_make,
  i.inv_model,
  c.classification_name
FROM inventory i
JOIN classification c
ON i.classification_id = c.classification_id;

-- Update image and thumbnail paths
UPDATE inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');  
