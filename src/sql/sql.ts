export const CategorySelect = `
SELECT category
FROM problems
GROUP BY category
`;

export const todayProblemsSelect = `
SELECT * FROM 
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, 0 AS ans_count, null AS last_answered, 'new' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NULL
AND p.category = $1
limit $2)
UNION ALL
SELECT * FROM
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(*) AS ans_count, max(h.created_at) AS last_answered, 'review_1' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND h.created_at BETWEEN date('now', '-3 day') AND date('now', '-1 day')
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
HAVING count(*) < 3
ORDER BY last_answered)
UNION ALL
SELECT * FROM
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(*) AS ans_count, max(h.created_at) AS last_answered, 'review_2' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND h.created_at BETWEEN date('now', '-7 day') AND date('now', '-4 day')
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
HAVING count(*) < 3
ORDER BY last_answered)
UNION ALL
SELECT * FROM
(SELECT p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level, count(*) AS ans_count, max(h.created_at) AS last_answered, 'review_3' AS problem_type
FROM problems p
LEFT JOIN histories h ON h.problem_id = p.id
WHERE h.id IS NOT NULL
AND h.created_at <= date('now', '-8 day')
AND p.category = $1
GROUP BY p.id, p.category, p.problem_name, p.problem_url, p.genre, p.difficulty_level
HAVING count(*) < 3
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