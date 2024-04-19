CREATE TABLE IF NOT EXISTS histories (
    id INTEGER PRIMARY KEY,
    problem_id INTEGER NOT NULL,
    answer_url TEXT,
    time INTEGER,
    note TEXT,
    is_self_resolved INTEGER,
    created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
    FOREIGN KEY (problem_id) REFERENCES problems(id)
);