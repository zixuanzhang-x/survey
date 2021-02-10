DROP TABLE IF EXISTS survey;

CREATE TABLE survey (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    best_day VARCHAR(9) NOT NULL,
    best_time VARCHAR(9) NOT NULL,
    info TEXT
);