import { useState } from "react";

import { Button, Group, NumberInput } from "@mantine/core";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

export const ImportForm = () => {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    try {
      const path = await open({
        multiple: false,
        filters: [{ name: "CSV", extensions: ["csv"] }],
      });
      if (!path) return;
      console.log(path);

      const value = await readTextFile(path.path);
      setValue(value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>登録</Button>
      {value}
    </>
  );
};
