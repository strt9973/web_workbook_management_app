import { Outlet } from "react-router-dom";

import { Box, Flex } from "@mantine/core";

import { Sidebar } from "./components/sideBar";

export default function Layout() {
  return (
    <Flex>
      <Sidebar />
      <Box w={"100%"} m={16}>
        <Outlet />
      </Box>
    </Flex>
  );
}
