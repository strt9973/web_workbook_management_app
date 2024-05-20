import { Anchor, Badge, Button, Card, Grid } from "@mantine/core";

import { Problem } from "../type";
import { calcBadgeColor, dateConverter } from "../utils/utils";

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
    self_resolved_count,
    last_answered,
  } = props.problem;

  const { openDrawer } = props;

  return (
    <>
      <Badge color="blue" radius={"none"}>
        {genre}
      </Badge>
      {ans_count && ans_count > 0 ? (
        <Badge color="Teal" radius={"none"}>
          総解答数：{ans_count}回
        </Badge>
      ) : null}
      {self_resolved_count && self_resolved_count > 0 ? (
        <Badge color="Teal" radius={"none"}>
          自力解答数：{self_resolved_count}回
        </Badge>
      ) : null}
      {last_answered ? (
        <Badge color="Indigo" radius={"none"}>
          最終解答日：{dateConverter(last_answered)}
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
            <Badge color={calcBadgeColor(difficulty_level)}>
              {difficulty_level}
            </Badge>
          </Grid.Col>
          <Grid.Col span={3} ta={"end"}>
            <Button size={"xs"} onClick={() => openDrawer(id)}>
              解答を記録
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};
