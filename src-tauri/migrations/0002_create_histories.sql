CREATE TABLE IF NOT EXISTS histories (
    id INTEGER PRIMARY KEY,
    problem_id INTEGER NOT NULL,
    answer_url TEXT NOT NULL,
    time INTEGER NOT NULL,
    note TEXT NOT NULL,
    is_self_resolved INTEGER NOT NULL,
    created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', datetime('now', 'localtime'))),
    FOREIGN KEY (problem_id) REFERENCES problems(id)
);