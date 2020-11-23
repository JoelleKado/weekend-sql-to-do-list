CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR(80) NOT NULL, 
	date  DATE,
	duration INTEGER NOT NULL,
	complete BOOLEAN DEFAULT 'false'
); 

SELECT * FROM "tasks" ORDER BY "date";

INSERT INTO tasks (task, date, duration)
VALUES ('Call Uncle John', '11-22-2020', '45');

INSERT INTO tasks (task, date, duration)
VALUES ('Groceries', '11-29-2020', '60');