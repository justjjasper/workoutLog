-- DROP DATABASE IF EXISTS workout_log;
CREATE DATABASE workout_log;

CREATE TABLE IF NOT EXISTS email_address (
  id SERIAL PRIMARY KEY NOT NULL,
  email_address VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_name (
  id SERIAL PRIMARY KEY NOT NULL,
  activity_name VARCHAR(255) NOT NULL,
  day INTEGER NOT NULL,
  month INTEGER NOT NULL,
  year  INTEGER NOT NULL,
  email_address_id INTEGER NOT NULL,
  FOREIGN KEY (email_address_id) REFERENCES email_address(id)
);

CREATE TABLE IF NOT EXISTS activity_info (
  id SERIAL PRIMARY KEY NOT NULL,
  activity_info VARCHAR(1000),
  activity_name_id INTEGER NOT NULL,
  FOREIGN KEY (activity_name_id) REFERENCES activity_name(id)
);

CREATE INDEX activity_name_email_address_id_idx ON activity_name (email_address_id);
CREATE INDEX activity_info_activity_name_id_idx ON activity_info (activity_name_id);

-- email_address table
INSERT INTO email_address (email_address, password)
VALUES
('johndoe@example.com', 'password123'),
('janedoe@example.com', 'password456');

-- activity_name table
INSERT INTO activity_name (activity_name, day, month, year, email_address_id)
VALUES
('Core', 12, 5, 2023, 1),
('Legs', 12, 5, 2023, 1),
('Core', 13, 5, 2023, 1),
('Shoulders', 13, 5, 2023, 1),
('Running', 13, 5, 2023, 1),
('Core', 14, 5, 2023, 1),
('Back', 14, 5, 2023, 1);

-- activity_info table
INSERT INTO activity_info (activity_info, activity_name_id)
VALUES
('Hanging Obliques 4x5', 1),
('Db Hex Squat 4x8 @45lb\nDb Rdl 4x8 @45lb w/ Glute Med Kicks 4x12\nHamstring Curl Mch 4x12 @60lb\nLeg Ex 4x10 @65lb', 2),
('Hanging Obliques 4x6', 3),
('Db Ohp 5x10 @45lb\nDb Lat Raise 4x10 @15lb w/ Shoulder Shrugs 4x15 @45lb\nFace pull 4x12 @ 44lb w/ Db Lat Raise 4x12 @10lb', 4),
('6 miles, 44:44mins PR', 5),
('Scap push ups 4x12', 6),
('Pull ups 4x9\nV-grip cable pulls 4x8 @99lb\nDb alt + both 4x10 @17.5lb', 7);
