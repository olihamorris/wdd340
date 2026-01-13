-- Insert a user (Tony Stark)
INSERT INTO account (
  account_firstname,
  account_lastname,
  account_email,
  account_password,
  account_type
)
VALUES (
  'Tony',
  'Stark',
  'tony@starkindustries.com',
  'iamironman',
  'Admin'
);

-- Update Tony Stark email address
UPDATE account
SET account_email = 'ironman@starkindustries.com'
WHERE account_email = 'tony@starkindustries.com';

-- Delete account (Tony Stark)
DELETE FROM account
WHERE account_email = 'ironman@starkindustries.com';

-- Select inventory with classification name
SELECT
  i.inv_make,
  i.inv_model,
  c.classification_name
FROM inventory i
JOIN classification c
ON i.classification_id = c.classification_id;

-- Update description for a specific inventory item
UPDATE inventory
SET inv_description = 'This vehicle is updated for assignment testing.'
WHERE inv_id = 1;

-- Update image and thumbnail paths
UPDATE inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');  



