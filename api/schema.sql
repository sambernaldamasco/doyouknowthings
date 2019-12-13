-- //////////////////////////////////////////////////////
-- BEFORE RUNNING THIS FILE
-- //////////////////////////////////////////////////////

-- create a new database in postgres named trivia(or doyouknowthings or even project4)

-- //////////////////////////////////////////////////////
-- to run this file use the following command in the terminal(inside the api folder)
-- psql -f schema.sql database_name
-- you should get the response
-- CREATE TABLE
-- INSERT 0 1
-- INSERT 0 1
-- ///////////////////////////////////////////////////////

-- creating the table
CREATE TABLE scoreboard(
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) UNIQUE,
  score INTEGER
);


-- adding some seed data for testing
INSERT INTO scoreboard (
  name,
  score
)
VALUES (
  'definitelynotsam',
  100
);

INSERT INTO scoreboard (
  name,
  score
)
VALUES (
  'ayla',
  102
);
