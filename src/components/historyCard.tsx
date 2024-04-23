import { Anchor, Badge, Button, Card, Grid } from "@mantine/core";

import { ViewHistory } from "../type";
import { dateConverter } from "../utils/utils";

export const HistoryCard = (props: {
  history: ViewHistory;
  openDrawer: (history: ViewHistory) => void;
}) => {
  const {
    problem_name,
    problem_url,
    genre,
    difficulty_level,
    time,
    note,
    is_self_resolved,
    created_at,
  } = props.history;

  const { openDrawer } = props;

  const color = difficulty_level == "Easy" ? "Lightgreen" : "Orange";

  return (
    <>
      <Badge color="blue" radius={"none"}>
        {genre}
      </Badge>
      <Badge color="Indigo" radius={"none"}>
        回答日：{dateConverter(created_at)}
      </Badge>
      <Badge color="Purple" radius={"none"}>
        時間：{time}分
      </Badge>
      {is_self_resolved ? (
        <Badge color="Green" radius={"none"}>
          自力解決
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
            <Button size="xs" onClick={() => openDrawer(props.history)}>
              回答の更新
            </Button>
          </Grid.Col>
        </Grid>
        <Grid align="center">
          <Grid.Col span={12} style={{ whiteSpace: "pre-wrap" }}>
            {note}
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};