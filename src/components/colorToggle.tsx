import { useContext } from "react";

import { ActionIcon } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import ColorSchemeContext from "../context/ColorSchemeContext";

export const ColorToggle = () => {
  const colorSchemeContext = useContext(ColorSchemeContext);
  const dark = colorSchemeContext.colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => colorSchemeContext.onChange(dark ? "light" : "dark")}
      title="Toggle color scheme"
    >
      {dark ? (
        <IconSun style={{ width: 18, height: 18 }} />
      ) : (
        <IconMoon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
};
