import { Link } from "react-router-dom";

import { Anchor, Box, Stack, Tooltip } from "@mantine/core";

import { routes } from "../route";
import { ColorToggle } from "./colorToggle";

export const Sidebar = () => {
  return (
    <Stack h={"calc(100vh - 48px)"} pt={16} gap={"xs"}>
      {routes.map((item) => (
        <Tooltip
          label={item.label}
          position="right"
          transitionProps={{ duration: 0 }}
          key={item.key}
        >
          <Anchor component={Link} to={item.path}>
            <Box mr={16} ml={16} mt={8} mb={8}>
              {item.icon}
            </Box>
          </Anchor>
        </Tooltip>
      ))}
      <Box m={16} mt={"auto"}>
        <ColorToggle />
      </Box>
    </Stack>
  );
};
