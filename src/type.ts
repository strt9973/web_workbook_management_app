export type Category = {
  category: string;
};

export type CreateProblem = {
  category: string;
  problem_name: string;
  problem_url: string;
  genre: string;
  difficulty_level: string;
};

export type Problem = {
  id: number;
  category: string;
  problem_name: string;
  problem_url: string;
  genre: string;
  difficulty_level: string;
  ans_count: number;
  self_resolved_count: number;
  last_answered: string;
};

export type TodayProblem = Problem & {
  problem_type: "new" | "review_1" | "review_2" | "review_3" | "weak";
};

export type todaySolvedProblemCount = {
  ans_count: number;
};

export type History = {
  id: number;
  problem_id: number;
  answer_url: string;
  time: number;
  note: string;
  is_self_resolved: boolean;
};

export type ViewHistory = History & { created_at: string } & Omit<
    Problem,
    "id" | "ans_count" | "last_answered"
  >;

export type Setting = {
  answer_threshold: number;
  review_1_threshold: number;
  review_2_threshold: number;
  review_3_threshold: number;
};
