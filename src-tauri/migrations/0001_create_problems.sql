CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY,
    category TEXT NOT NULL,
    problem_name TEXT NOT NULL,
    problem_url TEXT NOT NULL,
    genre TEXT NOT NULL,
    difficulty_level TEXT NOT NULL
);