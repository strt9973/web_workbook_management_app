import { Button, Checkbox, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { History } from "../../type";

type HistoryFormType = {
  problemId: number;
  save: (values: History) => void;
  initialValues?: History;
};

export const HistoryForm = (props: HistoryFormType) => {
  const { problemId, initialValues, save } = props;

  const form = useForm<History>({
    mode: "controlled",
    initialValues: initialValues
      ? initialValues
      : {
          id: 0,
          answer_url: "",
          time: 0,
          note: "",
          problem_id: problemId,
          is_self_resolved: true,
        },
  });

  return (
    <form onSubmit={form.onSubmit((values) => save(values))}>
      <TextInput
        label="問題のID"
        required
        readOnly
        {...form.getInputProps("problem_id")}
      />
      <TextInput
        label="解答のURL"
        required
        {...form.getInputProps("answer_url")}
      />
      <TextInput
        label="解答時間(分)"
        required
        {...form.getInputProps("time")}
      />
      <Textarea label="メモ" required {...form.getInputProps("note")} />
      <Checkbox
        mt="md"
        required
        label="自力解答できた"
        {...form.getInputProps("is_self_resolved", { type: "checkbox" })}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">記録</Button>
      </Group>
    </form>
  );
};
