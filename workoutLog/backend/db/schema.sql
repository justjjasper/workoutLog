-- DROP DATABASE IF EXISTS workoutLog;
CREATE DATABASE workoutLog;

CREATE TABLE IF NOT EXISTS usernames (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS activityName (
  id SERIAL PRIMARY KEY NOT NULL,
  activityName VARCHAR(255) NOT NULL,
  day INTEGER NOT NULL,
  month INTEGER NOT NULL,
  year  INTEGER NOT NULL,
  username_id INTEGER NOT NULL,
  FOREIGN KEY (username_id) REFERENCES usernames(id)
);

CREATE TABLE IF NOT EXISTS activityInfo (
  id SERIAL PRIMARY KEY NOT NULL,
  activityInfo VARCHAR(1000),
  activityName_id INTEGER NOT NULL,
  FOREIGN KEY (activityName_id) REFERENCES activityName(id)
);

CREATE INDEX activityName_username_id_idx ON activityName (username_id);
CREATE INDEX activityInfo_activityName_id_idx ON activityInfo (activityName_id);

-- usernames table
INSERT INTO usernames (username, password)
VALUES
('johndoe', 'password123'),
('janedoe', 'password456');

-- activityName table
INSERT INTO activityName (activityName, day, month, year, username_id)
VALUES
('Core', 12, 5, 2023, 1),
('Legs', 12, 5, 2023, 1),
('Core', 13, 5, 2023, 1),
('Shoulders', 13, 5, 2023, 1),
('Running', 13, 5, 2023, 1),
('Core', 14, 5, 2023, 1),
('Back', 14, 5, 2023, 1);


-- activityInfo table
INSERT INTO activityInfo (activityInfo, activityName_id)
VALUES
('Hanging Obliques 4x5', 1),
('Db Hex Squat 4x8 @45lb\nDb Rdl 4x8 @45lb w/ Glute Med Kicks 4x12\nHamstring Curl Mch 4x12 @60lb\nLeg Ex 4x10 @65lb', 2),
('Hanging Obliques 4x6', 3),
('Db Ohp 5x10 @45lb\nDb Lat Raise 4x10 @15lb w/ Shoulder Shrugs 4x15 @45lb\nFace pull 4x12 @ 44lb w/ Db Lat Raise 4x12 @10lb', 4),
('6 miles, 44:44mins PR', 5),
('Scap push ups 4x12', 6),
('Pull ups 4x9\nV-grip cable pulls 4x8 @99lb\nDb alt + both 4x10 @17.5lb', 7);

