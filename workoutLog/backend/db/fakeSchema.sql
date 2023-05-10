-- insert two usernames
INSERT INTO usernames (username, password) VALUES
('john_doe', 'password123'),
('jane_doe', 'abc123');

-- insert two activity names for each user
INSERT INTO activityName (activityName, date, username_id) VALUES
('Squats', '2023-05-01', 1),
('Bench Press', '2023-05-03', 1),
('Deadlifts', '2023-05-05', 2),
('Push-ups', '2023-05-07', 2),
('Squats', '2023-05-01', 2),
('Bench Press', '2023-05-03', 2);

-- insert two activity infos for each activity name
INSERT INTO activityInfo (activityInfo, activityName_id) VALUES
('3 sets of 10 reps @ 135lbs', 1),
('3 sets of 8 reps @ 155lbs', 2),
('3 sets of 6 reps @ 225lbs', 3),
('3 sets of 12 reps', 4),
('3 sets of 10 reps @ 135lbs', 5),
('3 sets of 8 reps @ 155lbs', 6);


cheat codes, queries the activity username, activityName, activityInfo (remote username if u dnt want it)
SELECT usernames.username, activityName.activityName, activityInfo.activityInfo
FROM usernames
JOIN activityName ON activityName.username_id = usernames.id
JOIN activityInfo ON activityInfo.activityName_id = activityName.id
WHERE usernames.username = 'example_username';
