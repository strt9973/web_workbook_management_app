import { useEffect, useState } from "react";

import {
  Anchor,
  Badge,
  Button,
  Drawer,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { HistoryForm } from "../../components/historyForm";
import { useExecute, useSelect } from "../../hooks/useDatabase";
import { allProblemSelect, createHistory } from "../../sql/sql";
import { History, Problem } from "../../type";

type ProblemTableType = {
  category: string;
};

export const ProblemTable = ({ category }: ProblemTableType) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemId, setProblemId] = useState<number>();
  const [opened, { open, close }] = useDisclosure(false);

  const getProblems = async () => {
    const problems = await useSelect<Problem>(allProblemSelect, [category]);
    if (!problems) return;
    setProblems(problems);
  };

  useEffect(() => {
    getProblems();
  }, []);

  const openDrawer = (problemId: number) => {
    setProblemId(problemId);
    open();
  };

  const save = async (values: History) => {
    await useExecute(createHistory, [
      values.problem_id,
      values.answer_url,
      values.time,
      values.note,
      values.is_self_resolved ? 1 : 0,
    ]);
    getProblems();
    close();
  };

  return (
    <>
      {problems.length ? (
        <ScrollArea h={"calc(100vh - 72px)"}>
          <Table striped withRowBorders={false}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>名前</Table.Th>
                <Table.Th>ジャンル</Table.Th>
                <Table.Th>難易度</Table.Th>
                <Table.Th>解答数</Table.Th>
                <Table.Th>最終解答日</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {problems.map((problem) => {
                const color =
                  problem.difficulty_level == "Easy" ? "Lightgreen" : "Orange";
                return (
                  <Table.Tr key={problem.id}>
                    <Table.Td>{problem.id}</Table.Td>
                    <Table.Td>
                      <Anchor
                        href={problem.problem_url}
                        target="_blank"
                        size="sm"
                      >
                        {problem.problem_name}
                      </Anchor>
                    </Table.Td>
                    <Table.Td>
                      <Badge>{problem.genre}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={color}>{problem.difficulty_level}</Badge>
                    </Table.Td>
                    <Table.Td>{problem.ans_count}</Table.Td>
                    <Table.Td>{problem.last_answered}</Table.Td>
                    <Table.Td>
                      <Button onClick={() => openDrawer(problem.id)} size="xs">
                        回答を記録
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      ) : null}

      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="解答を登録"
      >
        {problemId ? <HistoryForm problemId={problemId} save={save} /> : null}
      </Drawer>
    </>
  );
};
