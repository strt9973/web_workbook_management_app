import { Link } from "react-router-dom";

import { Box, Tooltip } from "@mantine/core";

import { routes } from "../route";

export const Sidebar = () => {
  return (
    <Box h={"100vh"} w={52} pt={8}>
      {routes.map((item) => (
        <Tooltip
          label={item.label}
          position="right"
          transitionProps={{ duration: 0 }}
          key={item.key}
        >
          <Link to={item.path}>
            <Box m={16}>{item.icon}</Box>
          </Link>
        </Tooltip>
      ))}
    </Box>
  );
};
