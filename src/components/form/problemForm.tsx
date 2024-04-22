import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { CreateProblem } from "../../type";

type ProblemFormType = {
  save: (values: CreateProblem) => void;
};

export const ProblemForm = (props: ProblemFormType) => {
  const { save } = props;

  const form = useForm<CreateProblem>({
    mode: "controlled",
    validate: {
      category: (value) => (value ? null : "カテゴリ名は必須項目です"),
      problem_name: (value) => (value ? null : "問題の名前は必須項目です"),
      problem_url: (value) => (value ? null : "問題のURLは必須項目です"),
      genre: (value) => (value ? null : "ジャンルは必須項目です"),
      difficulty_level: (value) => (value ? null : "難易度は必須項目です"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => save(values))}>
      <TextInput
        label="カテゴリ名"
        required
        {...form.getInputProps("category")}
      />
      <TextInput
        label="問題の名前"
        required
        {...form.getInputProps("problem_name")}
      />
      <TextInput
        label="問題のURL"
        required
        {...form.getInputProps("problem_url")}
      />
      <TextInput label="ジャンル" required {...form.getInputProps("genre")} />
      <TextInput
        label="難易度"
        required
        {...form.getInputProps("difficulty_level")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">登録</Button>
      </Group>
    </form>
  );
};
