import { useEffect, useState } from "react";

import { Box, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { historiesSelect, updateHistory } from "../../sql/sql";
import { History, ViewHistory } from "../../type";
import { execute, select } from "../../utils/db";
import { HistoryForm } from "../form/historyForm";
import { HistoryCard } from "../historyCard";

type ProblemListType = {
  category: string;
};

export const HistoryList = ({ category }: ProblemListType) => {
  const [histories, setHistories] = useState<ViewHistory[]>([]);

  const [history, setHistory] = useState<History>();
  const [opened, { open, close }] = useDisclosure(false);

  const getHistoryList = async () => {
    const histories = await select<ViewHistory>(historiesSelect, [category]);

    if (!histories) return;
    setHistories(histories);
  };

  useEffect(() => {
    getHistoryList();
  }, []);

  const openDrawer = (history: ViewHistory) => {
    setHistory({
      id: history.id,
      problem_id: history.problem_id,
      answer_url: history.answer_url,
      time: history.time,
      note: history.note,
      is_self_resolved: history.is_self_resolved ? true : false,
    });
    open();
  };

  const save = async (values: History) => {
    await execute(updateHistory, [
      values.problem_id,
      values.answer_url,
      values.time,
      values.note ? values.note : "",
      values.is_self_resolved ? 1 : 0,
      values.id,
    ]);
    getHistoryList();
    close();
  };

  return (
    <>
      <ScrollArea h={"calc(100vh - 120px)"} p={16}>
        {histories.map((h) => {
          return (
            <Box pb={8} key={h.id}>
              <HistoryCard history={h} openDrawer={openDrawer} />
            </Box>
          );
        })}
      </ScrollArea>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="解答を更新"
      >
        {history ? (
          <HistoryForm
            problemId={history.problem_id}
            initialValues={history}
            save={save}
          />
        ) : null}
      </Drawer>
    </>
  );
};
