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
('Legs', 17, 4, 2023, 1),
('Cardio', 17, 4, 2023, 1),
('Cardio', 17, 4, 2023, 1),
('Cardio', 17, 4, 2023, 1),
('Cardio', 17, 4, 2023, 1),
('Cardio', 5, 4, 2023, 1),
('Chest', 7, 5, 2023, 2),
('Back', 18, 4, 2023, 2),
('Cardio3', 18, 4, 2023, 2);

-- activityInfo table
INSERT INTO activityInfo (activityInfo, activityName_id)
VALUES
('3 sets of 10 reps @ 135lbs', 1),
('3 sets of 8 reps @ 155lbs', 1),
('3 sets of 6 reps @ 225lbs', 1),
('1 hour on treadmill', 2),
('30 minutes on elliptical', 2),
('1 hour on stationary bike', 2),
('Vinyasa Flow', 3),
('Hatha Yoga', 3),
('Restorative Yoga', 3),
('3 sets of 12 reps', 4),
('3 sets of 10 reps @ 135lbs', 4),
('3 sets of 8 reps @ 155lbs', 4),
('10 laps freestyle', 5),
('5 laps backstroke', 5),
('3 laps breaststroke', 5),
('10 laps freestyle', 6),
('5 laps backstroke', 6),
('3 laps breaststroke', 6);
