import { IconCalendar, IconList } from "@tabler/icons-react";

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
    element: <div>problems</div>,
    icon: <IconList />,
    label: "問題一覧",
  },
];
