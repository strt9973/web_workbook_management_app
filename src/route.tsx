import {
  IconCalendar,
  IconHistory,
  IconList,
  IconSettings,
} from "@tabler/icons-react";

import { Histories } from "./pages/history/histories";
import { Problems } from "./pages/problem/problems";
import { Settings } from "./pages/setting/settings";
import { Today } from "./pages/today/today";

export const routes = [
  {
    path: "/",
    key: "today",
    element: <Today />,
    icon: <IconCalendar />,
    label: "今日の問題",
  },
  {
    path: "/problems",
    key: "problem",
    element: <Problems />,
    icon: <IconList />,
    label: "問題一覧",
  },
  {
    path: "/histories",
    key: "history",
    element: <Histories />,
    icon: <IconHistory />,
    label: "回答履歴",
  },
  {
    path: "/settings",
    key: "setting",
    element: <Settings />,
    icon: <IconSettings />,
    label: "設定",
  },
];
