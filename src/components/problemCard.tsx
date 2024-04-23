import { Anchor, Badge, Button, Card, Grid } from "@mantine/core";

import { Problem } from "../type";
import { dateConverter } from "../utils/utils";

export const ProblemCard = (props: {
  problem: Problem;
  openDrawer: (problemId: number) => void;
}) => {
  const {
    id,
    problem_name,
    problem_url,
    genre,
    difficulty_level,
    ans_count,
    last_answered,
  } = props.problem;

  const { openDrawer } = props;

  const color = difficulty_level == "Easy" ? "Lightgreen" : "Orange";

  return (
    <>
      <Badge color="blue" radius={"none"}>
        {genre}
      </Badge>
      {ans_count && ans_count > 0 ? (
        <Badge color="Teal" radius={"none"}>
          回答数：{ans_count}回
        </Badge>
      ) : null}
      {last_answered ? (
        <Badge color="Indigo" radius={"none"}>
          最終回答日：{dateConverter(last_answered)}
        </Badge>
      ) : null}
      <Card mb="xs" padding="xs" withBorder>
        <Grid align="center">
          <Grid.Col span={6}>
            <Anchor href={problem_url} target="_blank">
              {problem_name}
            </Anchor>
          </Grid.Col>
          <Grid.Col span={3}>
            <Badge color={color}>{difficulty_level}</Badge>
          </Grid.Col>
          <Grid.Col span={3} ta={"end"}>
            <Button size={"xs"} onClick={() => openDrawer(id)}>
              回答を記録
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};
