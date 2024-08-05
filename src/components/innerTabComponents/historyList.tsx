import { useDeferredValue, useEffect, useState } from 'react';

import { Box, Drawer, ScrollArea, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { historiesSelect, updateHistory } from '../../sql/sql';
import { History, ViewHistory } from '../../type';
import { execute, select } from '../../utils/db';
import { HistoryForm } from '../form/historyForm';
import { HistoryCard } from '../historyCard';

type ProblemListType = {
  category: string;
};

export const HistoryList = ({ category }: ProblemListType) => {
  const [histories, setHistories] = useState<ViewHistory[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const deferredKeyword = useDeferredValue(keyword);
  const [filteredHistories, setFilteredHistories] = useState<ViewHistory[]>([]);

  const [history, setHistory] = useState<History>();
  const [opened, { open, close }] = useDisclosure(false);

  const getHistoryList = async () => {
    const histories = await select<ViewHistory>(historiesSelect, [category]);
    if (!histories) return;
    setHistories(histories);
    setFilteredHistories(histories);
  };

  useEffect(() => {
    getHistoryList();
  }, [category]);

  useEffect(() => {
    if (deferredKeyword) {
      const filteredHistories = histories.filter((history) =>
        history.problem_name
          .toLowerCase()
          .includes(deferredKeyword.toLowerCase())
      );
      setFilteredHistories(filteredHistories);
    } else {
      setFilteredHistories(histories);
    }
  }, [deferredKeyword, histories]);

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
    <ScrollArea h={"calc(100vh - 120px)"}>
      <TextInput
        label="問題名検索"
        onChange={(e) => setKeyword(e.target.value)}
      />
      {filteredHistories.map((h) => {
        return (
          <Box pt={8} key={h.id}>
            <HistoryCard history={h} openDrawer={openDrawer} />
          </Box>
        );
      })}

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
    </ScrollArea>
  );
};
