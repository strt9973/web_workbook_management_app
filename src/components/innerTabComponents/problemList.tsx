import { useEffect, useState } from "react";

import { Accordion, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Store } from "@tauri-apps/plugin-store";

import { useExecute, useSelect } from "../../hooks/useDatabase";
import { createHistory, todayProblemsSelect } from "../../sql/sql";
import { History, Setting, TodayProblem } from "../../type";
import { HistoryForm } from "../form/historyForm";
import { ProblemCard } from "../problemCard";

type ProblemListType = {
  category: string;
};

export const ProblemList = ({ category }: ProblemListType) => {
  const store = new Store(".settings.dat");
  const [newProblems, setNewProblems] = useState<TodayProblem[]>([]);
  const [review1Problems, setReview1Problems] = useState<TodayProblem[]>([]);
  const [review2Problems, setReview2Problems] = useState<TodayProblem[]>([]);
  const [review3Problems, setReview3Problems] = useState<TodayProblem[]>([]);
  const [weakProblems, setWeakProblems] = useState<TodayProblem[]>([]);
  const [problemId, setProblemId] = useState<number>();
  const [opened, { open, close }] = useDisclosure(false);
  const [setting, setSetting] = useState<Setting>();

  const getProblemList = async () => {
    const setting = await store.get<Setting>("setting");
    if (setting) {
      setSetting(setting);
    } else {
      setSetting({
        answer_threshold: 3,
        review_1_threshold: 1,
        review_2_threshold: 7,
        review_3_threshold: 14,
      });
    }
    const problemList = await useSelect<TodayProblem>(todayProblemsSelect, [
      category,
      2,
      3,
      `-${
        setting && setting.review_1_threshold ? setting.review_1_threshold : 1
      } day`,
      `-${
        setting && setting.review_2_threshold ? setting.review_2_threshold : 7
      } day`,
      `-${
        setting && setting.review_2_threshold
          ? setting.review_2_threshold + 1
          : 8
      } day`,
      `-${
        setting && setting.review_3_threshold ? setting.review_3_threshold : 14
      } day`,
      `-${
        setting && setting.review_3_threshold
          ? setting.review_3_threshold + 1
          : 15
      } day`,
    ]);

    console.log(problemList);
    if (!problemList) return;
    setNewProblems(problemList.filter((p) => p.problem_type === "new"));
    setReview1Problems(
      problemList.filter((p) => p.problem_type === "review_1")
    );
    setReview2Problems(
      problemList.filter((p) => p.problem_type === "review_2")
    );
    setReview3Problems(
      problemList.filter((p) => p.problem_type === "review_3")
    );
    setWeakProblems(problemList.filter((p) => p.problem_type === "weak"));
  };

  useEffect(() => {
    getProblemList();
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
      values.note ? values.note : "",
      values.is_self_resolved ? 1 : 0,
    ]);
    getProblemList();
    close();
  };

  return (
    <ScrollArea h={"calc(100vh - 120px)"} p={16}>
      <Accordion defaultValue="today" mt="md">
        <Accordion.Item key="today" value="today">
          <Accordion.Control icon="">次に解く問題</Accordion.Control>
          <Accordion.Panel>
            {newProblems.length ? (
              <>
                {newProblems.map((p) => {
                  return (
                    <ProblemCard
                      problem={p}
                      openDrawer={openDrawer}
                      key={p.id}
                    />
                  );
                })}
              </>
            ) : (
              <p>ありません</p>
            )}
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="review1" value="review1">
          <Accordion.Control>
            回答後{setting?.review_1_threshold ? setting.review_1_threshold : 1}
            日以上経過した問題
          </Accordion.Control>
          <Accordion.Panel>
            {review1Problems.length ? (
              <>
                {review1Problems.map((p) => {
                  return (
                    <ProblemCard
                      problem={p}
                      openDrawer={openDrawer}
                      key={p.id}
                    />
                  );
                })}
              </>
            ) : (
              <p>ありません</p>
            )}
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="review2" value="review2">
          <Accordion.Control>
            回答後{setting?.review_2_threshold ? setting.review_2_threshold : 7}
            日以上経過した問題
          </Accordion.Control>
          <Accordion.Panel>
            {review2Problems.length ? (
              <>
                {review2Problems.map((p) => {
                  return (
                    <ProblemCard
                      problem={p}
                      openDrawer={openDrawer}
                      key={p.id}
                    />
                  );
                })}
              </>
            ) : (
              <p>ありません</p>
            )}
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="review3" value="review3">
          <Accordion.Control>
            回答後
            {setting?.review_3_threshold ? setting.review_3_threshold : 14}
            日以上経過した問題
          </Accordion.Control>
          <Accordion.Panel>
            {review3Problems.length ? (
              <>
                {review3Problems.map((p) => {
                  return (
                    <ProblemCard
                      problem={p}
                      openDrawer={openDrawer}
                      key={p.id}
                    />
                  );
                })}
              </>
            ) : (
              <p>ありません</p>
            )}
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key="weak" value="weak">
          <Accordion.Control>苦手な問題</Accordion.Control>
          <Accordion.Panel>
            {weakProblems.length ? (
              <>
                {weakProblems.map((p) => {
                  return (
                    <ProblemCard
                      problem={p}
                      openDrawer={openDrawer}
                      key={p.id}
                    />
                  );
                })}
              </>
            ) : (
              <p>ありません</p>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="回答を登録"
      >
        {problemId ? <HistoryForm problemId={problemId} save={save} /> : null}
      </Drawer>
    </ScrollArea>
  );
};
