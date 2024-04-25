import { ActionIcon, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import { ProblemForm } from "../../components/form/problemForm";
import { ProblemTable } from "../../components/innerTabComponents/problemTable";
import { TabFrame } from "../../components/tabFrame";
import { createProblem } from "../../sql/sql";
import { CreateProblem } from "../../type";
import { execute } from "../../utils/db";

export const Problems = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const save = async (values: CreateProblem) => {
    await execute(createProblem, [
      values.category,
      values.problem_name,
      values.problem_url,
      values.genre,
      values.difficulty_level,
    ]);
    close();
  };

  return (
    <>
      <TabFrame innerTabComponent={<ProblemTable category="" />}></TabFrame>
      <ActionIcon
        style={{ display: "float", position: "fixed", top: 16, right: 16 }}
        onClick={open}
      >
        <IconPlus />
      </ActionIcon>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="問題を登録"
      >
        {history ? <ProblemForm save={save} /> : null}
      </Drawer>
    </>
  );
};
