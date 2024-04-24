import { Outlet } from "react-router-dom";

import { AppShell, Box, Flex } from "@mantine/core";

import { Sidebar } from "./components/sideBar";
import { Timer } from "./components/timer";

export default function Layout() {
  return (
    <AppShell footer={{ height: 48 }}>
      <AppShell.Main>
        <Flex>
          <Sidebar />
          <Box w={"100%"} mt={16} mb={16} mr={16}>
            <Outlet />
          </Box>
        </Flex>
      </AppShell.Main>
      <AppShell.Footer>
        <Timer />
      </AppShell.Footer>
    </AppShell>
  );
}
