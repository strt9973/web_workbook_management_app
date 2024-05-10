type ValidatorType = (value: string) => boolean | string;

const problemUrlValidator: ValidatorType = (value) => {
  if (!(value.startsWith("https://") || value.startsWith("http://")))
    return "https:// か http:// で始まっている必要があります。";
  return true;
};

const problemDifficultyValidator: ValidatorType = (value) => {
  if (!["Easy", "Medium", "Hard"].includes(value))
    return "Easy か Medium か Hard のいずれかである必要があります。";
  return true;
};

export const importFormValidators = {
  problem_url: problemUrlValidator,
  difficulty_level: problemDifficultyValidator,
};
