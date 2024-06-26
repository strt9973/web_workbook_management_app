export const CategorySelect = `
SELECT category
FROM problems
GROUP BY category
`;

export const todayProblemsSelect = `
SELECT * FROM 
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, 0 AS ans_count, 0 AS self_resolved_count, null AS last_answered, 'new' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NULL
AND p.category = $1
limit $2)
UNION ALL
SELECT * FROM
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(*) AS ans_count, sum(CASE WHEN h.is_self_resolved = 1 THEN 1 ELSE 0 END) as self_resolved_count, max(h.created_at) AS last_answered, 'review_1' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
HAVING self_resolved_count < 2
AND date(max(h.created_at)) BETWEEN date('now', $4) AND date('now', $3)
ORDER BY self_resolved_count, last_answered)
UNION ALL
SELECT * FROM
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(*) AS ans_count, sum(CASE WHEN h.is_self_resolved = 1 THEN 1 ELSE 0 END) as self_resolved_count, max(h.created_at) AS last_answered, 'review_2' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
HAVING self_resolved_count < 3
AND date(max(h.created_at)) BETWEEN date('now', $6) AND date('now', $5)
ORDER BY self_resolved_count, last_answered)
UNION ALL
SELECT * FROM
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(*) AS ans_count, sum(CASE WHEN h.is_self_resolved = 1 THEN 1 ELSE 0 END) as self_resolved_count, max(h.created_at) AS last_answered, 'review_3' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
HAVING self_resolved_count < 4
AND date(max(h.created_at)) <= date('now', $7)
ORDER BY self_resolved_count, last_answered)
UNION ALL
SELECT * FROM
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(*) AS ans_count, sum(CASE WHEN h.is_self_resolved = 1 THEN 1 ELSE 0 END) as self_resolved_count, max(h.created_at) AS last_answered, 'weak' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
HAVING self_resolved_count < 4
AND self_resolved_count < ans_count
ORDER BY last_answered);
`;

export const todaySolvedProblems = `
SELECT count(*) AS ans_count
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND date(h.created_at) = date('now')
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level;
`;

export const createHistory = `
INSERT INTO histories (problem_id, answer_url, time, note, is_self_resolved) VALUES
($1, $2, $3, $4, $5);
`;

export const updateHistory = `
UPDATE histories SET problem_id = $1, answer_url = $2, time = $3, note = $4, is_self_resolved = $5
WHERE id = $6;
`;

export const allProblemSelect = `
SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(h.id) AS ans_count, max(h.created_at) AS last_answered
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
ORDER BY p.id
`;

export const historiesSelect = `
SELECT h.id, h.problem_id, h.answer_url, h.time, h.note, h.is_self_resolved, h.created_at, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
FROM histories h
LEFT JOIN problems p ON p.id = h.problem_id
WHERE p.category = $1
ORDER BY h.created_at DESC
`;

export const createProblem = `
INSERT INTO problems (category, problem_name, problem_url, genre, difficulty_level) VALUES
($1, $2, $3, $4, $5);
`;
