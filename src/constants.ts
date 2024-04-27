import { ImportProblemType } from "./type";

export const PROBLEM_IMPORT_COLUMN_NAME_MAP: {
  [key: string]: keyof ImportProblemType;
} = {
  カテゴリ: "category",
  問題名: "problem_name",
  問題URL: "problem_url",
  ジャンル: "genre",
  難易度: "difficulty_level",
};
