import { Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Store } from "@tauri-apps/plugin-store";

import { Setting } from "../../type";

export const SettingForm = (props: { initialValues: Setting }) => {
  const store = new Store(".settings.dat");
  const { initialValues } = props;

  const form = useForm<Setting>({
    mode: "uncontrolled",
    initialValues: initialValues,
  });

  const save = async (values: Setting) => {
    await store.set("setting", values);
    await store.save();
  };
  return (
    <form onSubmit={form.onSubmit((values) => save(values))}>
      <NumberInput
        label="1回目の復習日"
        required
        {...form.getInputProps("review_1_threshold")}
      />
      <NumberInput
        label="2回目の復習日"
        required
        {...form.getInputProps("review_2_threshold")}
      />
      <NumberInput
        label="3回目の復習日"
        required
        {...form.getInputProps("review_3_threshold")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">登録</Button>
      </Group>
    </form>
  );
};
