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
    mode: "uncontrolled",
    initialValues: initialValues
      ? initialValues
      : {
          id: 0,
          answer_url: "",
          time: 0,
          note: "",
          problem_id: problemId,
          is_self_resolved: false,
        },
    validate: {
      problem_id: (value) => (value ? null : ""),
      answer_url: (value) => (value ? null : "回答のURLは必須項目です"),
      time: (value) => (value ? null : "回答時間(分)は必須項目です"),
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
        label="回答のURL"
        required
        {...form.getInputProps("answer_url")}
      />
      <TextInput
        label="回答時間(分)"
        required
        {...form.getInputProps("time")}
      />
      <Textarea
        label="メモ"
        {...form.getInputProps("note")}
        autosize={true}
        minRows={6}
      />
      <Checkbox
        mt="md"
        label="自力回答できた"
        {...form.getInputProps("is_self_resolved", { type: "checkbox" })}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">記録</Button>
      </Group>
    </form>
  );
};
